import os
import re
import shutil
import sys

def slugify(text):
    # Keep the extension
    base, ext = os.path.splitext(text)
    
    # Handle Turkish characters
    turkish_map = str.maketrans("ĞÜŞİÖÇğüşıöç", "GUSIOCgusiec")
    base = base.translate(turkish_map)
    
    # Lowercase
    base = base.lower()
    
    # Replace anything not alphanumeric with hyphen
    base = re.sub(r'[^a-z0-9]+', '-', base)
    
    # Remove multiple hyphens
    base = re.sub(r'-+', '-', base)
    
    # Trim hyphens from ends
    base = base.strip('-')
    
    return base + ext.lower()

def fix_assets(root_dir):
    mapping = []
    
    # We walk bottom-up so that we rename children before their parents
    # This avoids "path not found" errors when a parent folder is renamed
    for root, dirs, files in os.walk(root_dir, topdown=False):
        # Rename files first
        for name in files:
            old_path = os.path.join(root, name)
            new_name = slugify(name)
            new_path = os.path.join(root, new_name)
            
            if old_path != new_path:
                print(f"Renaming File: {name} -> {new_name}")
                try:
                    # Handle collision
                    if os.path.exists(new_path):
                        print(f"  Collision! Skipping {new_name} (already exists)")
                    else:
                        os.rename(old_path, new_path)
                        # Store mapping relative to public/
                        rel_old = os.path.relpath(old_path, root_dir).replace('\\', '/')
                        rel_new = os.path.relpath(new_path, root_dir).replace('\\', '/')
                        mapping.append((rel_old, rel_new))
                except Exception as e:
                    print(f"  Error: {e}")

        # Rename directories
        for name in dirs:
            old_path = os.path.join(root, name)
            # Directories don't have extensions to preserve
            new_name = slugify(name)
            new_path = os.path.join(root, new_name)
            
            if old_path != new_path:
                print(f"Renaming Folder: {name} -> {new_name}")
                try:
                    if os.path.exists(new_path):
                        # If renamed version exists, we might need to merge or just use existing
                        # For simple fix, we try to move contents
                        print(f"  Folder exists! Merging contents...")
                        for item in os.listdir(old_path):
                            shutil.move(os.path.join(old_path, item), os.path.join(new_path, item))
                        os.rmdir(old_path)
                    else:
                        os.rename(old_path, new_path)
                except Exception as e:
                    print(f"  Error: {e}")

    return mapping

if __name__ == "__main__":
    public_dir = os.path.join(os.getcwd(), "public")
    if not os.path.exists(public_dir):
        print(f"Error: {public_dir} not found. Run from project root.")
        sys.exit(1)
        
    print(f"Starting comprehensive asset fix in {public_dir}...")
    changes = fix_assets(public_dir)
    print(f"\nDone! Fixed {len(changes)} files/folders.")
    
    if changes:
        print("\n--- SQL FOR DATABASE UPDATES ---")
        print("-- Run these in Supabase SQL Editor --\n")
        
        for old, new in changes:
            # We use ILIKE '%...%' to be very permissive with existing paths in DB
            print(f"UPDATE metal_products SET image_url = '/{new}' WHERE image_url ILIKE '%{old}';")
            print(f"UPDATE products SET image = '/{new}' WHERE image ILIKE '%{old}';")
            print(f"UPDATE categories SET image_url = '/{new}' WHERE image_url ILIKE '%{old}';")
            print(f"UPDATE instagram_posts SET image_url = '/{new}' WHERE image_url ILIKE '%{old}';")
