import os

files_to_lower = ["Button.tsx", "Input.tsx", "Dialog.tsx"]
base_path = r"c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\src\components\ui"

for filename in files_to_lower:
    original = os.path.join(base_path, filename)
    target = os.path.join(base_path, filename.lower())
    
    if os.path.exists(original):
        # On Windows, cannot rename to same name with different case directly sometimes, 
        # but also check if they are effectively the same file.
        # If I rename Button.tsx to button.tsx, python might just do it or fail.
        # Safe way: rename to intermediate.
        temp = os.path.join(base_path, filename + ".temp")
        os.rename(original, temp)
        os.rename(temp, target)
        print(f"Renamed {filename} to {filename.lower()}")
    else:
        print(f"File {filename} not found (might already be lowercase or missing)")
