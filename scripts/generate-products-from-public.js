const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_FILE = path.join(ROOT, "src", "lib", "products.ts");

const CATEGORY_FOLDERS = [
  { folder: "ARABALAR PLAKA", category: "ARABA_PLAKA" },
  { folder: "ATATÜRK PLAKA", category: "ATATURK_PLAKA" },
  { folder: "KARAKTERLER  PLAKA", category: "CHARACTER_PLAKA" },
  { folder: "MOTOR PLAKA", category: "MOTOR_PLAKA" },
  { folder: "YAPAY CİTY", category: "YAPAY_CITY" },
];

const CATEGORY_DISPLAY_NAMES = {
  "ARABA_PLAKA": "Araba",
  "ATATURK_PLAKA": "Ataturk",
  "CHARACTER_PLAKA": "Karakter",
  "MOTOR_PLAKA": "Motor",
  "YAPAY_CITY": "Yapay City"
};

const EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png", ".jfif"]);

const toAscii = (input) =>
  input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U");

const toTitle = (name, index) => {
  const cleaned = toAscii(name)
    .replace(/[_\-]+/g, " ")
    .replace(/[()]/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return `Urun ${index}`;
  return `Urun ${index}`;
};

const toSlug = (name) =>
  toAscii(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const walkFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walkFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

const seenSlugs = new Set();
const products = [];
let globalIndex = 1;

for (const group of CATEGORY_FOLDERS) {
  const baseDir = path.join(PUBLIC_DIR, group.folder);
  const allFiles = walkFiles(baseDir)
    .filter((file) => EXTENSIONS.has(path.extname(file).toLowerCase()))
    .filter((file) => !file.includes(`${path.sep}Output${path.sep}Output${path.sep}`));

  let categoryIndex = 1;

  for (const file of allFiles) {
    const rel = path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
    const fileBase = path.basename(file, path.extname(file));

    // Use category-based naming
    const displayName = CATEGORY_DISPLAY_NAMES[group.category] || "Urun";
    const name = `${displayName} ${String(categoryIndex).padStart(2, '0')}`;

    // const name = toTitle(fileBase, globalIndex); // OLD LOGIC REMOVED
    let slug = toSlug(`${group.category}-${fileBase}`);
    if (!slug) slug = `metal-poster-${products.length + 1}`;
    if (seenSlugs.has(slug)) {
      let i = 2;
      while (seenSlugs.has(`${slug}-${i}`)) i += 1;
      slug = `${slug}-${i}`;
    }
    seenSlugs.add(slug);

    const imagePath = encodeURI(`/${rel}`);

    products.push({
      id: slug,
      name,
      slug,
      price: 350,
      image: imagePath,
      description:
        "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
      story:
        "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
      category: group.category,
      specs: {
        material: "Aluminum",
        process: "UV Print",
        print: "4K",
        thickness: "1.5mm",
        dims: "30x45cm",
        mounting: "Magnetic",
      },
      seo: {
        title: `${name} Metal Poster`,
        description:
          "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
        keywords: ["metal poster", "aluminum", "wall art", "premium"],
      },
      images: [imagePath],
    });
    globalIndex += 1;
    categoryIndex += 1;
  }
}

const toProductMap = (list) =>
  list.reduce((acc, item) => {
    acc[item.slug] = item;
    return acc;
  }, {});

const fileContent = `export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    description: string;
    story: string;
    category: string;
    specs: Record<string, string>;
    seo?: {
        title: string;
        description: string;
        keywords: string[];
    };
    images?: string[];
}

export const PRODUCTS_DATA: Record<string, Product> = ${JSON.stringify(
  toProductMap(products),
  null,
  4
)};

export const PRODUCTS: Product[] = Object.values(PRODUCTS_DATA);
`;

fs.writeFileSync(OUT_FILE, fileContent, "utf8");
console.log(`Generated ${products.length} products to src/lib/products.ts`);
