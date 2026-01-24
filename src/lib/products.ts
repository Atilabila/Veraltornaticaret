export interface Product {
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
    stock_quantity?: number;
}

export const PRODUCTS_DATA: Record<string, Product> = {
    "araba-plaka-3000x1500": {
        "id": "araba-plaka-3000x1500",
        "name": "Araba 01",
        "slug": "araba-plaka-3000x1500",
        "price": 350,
        "image": "/products/arabalar-plaka/3000x1500.webp",
        "description": "1.5MM ALÜMİNYUM PLAKA. YÜKSEK ÇÖZÜNÜRLÜKLÜ UV BASKI. ÖMÜR BOYU FORM KORUMA.",
        "story": "KUSURSUZ KENAR FORMU VE ENDÜSTRİYEL YÜZEY. GALERİ STANDARTLARINDA RENK DOĞRULUĞU.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 01 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/3000x1500.webp"
        ]
    },
    "araba-plaka-4340a30f809c58b892586adf8d844fb1": {
        "id": "araba-plaka-4340a30f809c58b892586adf8d844fb1",
        "name": "Araba 02",
        "slug": "araba-plaka-4340a30f809c58b892586adf8d844fb1",
        "price": 350,
        "image": "/products/arabalar-plaka/4340a30f809c58b892586adf8d844fb1.webp",
        "description": "1.5MM ALÜMİNYUM PLAKA. YÜKSEK ÇÖZÜNÜRLÜKLÜ UV BASKI. ÖMÜR BOYU FORM KORUMA.",
        "story": "KUSURSUZ KENAR FORMU VE ENDÜSTRİYEL YÜZEY. GALERİ STANDARTLARINDA RENK DOĞRULUĞU.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 02 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/4340a30f809c58b892586adf8d844fb1.webp"
        ]
    },
    "araba-plaka-ford-4332266-960-720": {
        "id": "araba-plaka-ford-4332266-960-720",
        "name": "Araba 03",
        "slug": "araba-plaka-ford-4332266-960-720",
        "price": 350,
        "image": "/products/arabalar-plaka/ford-4332266_960_720.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 03 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/ford-4332266_960_720.webp"
        ]
    },
    "araba-plaka-indir-4": {
        "id": "araba-plaka-indir-4",
        "name": "Araba 04",
        "slug": "araba-plaka-indir-4",
        "price": 350,
        "image": "/products/arabalar-plaka/indir%20(4).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 04 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/indir%20(4).webp"
        ]
    },
    "araba-plaka-peakpx-15": {
        "id": "araba-plaka-peakpx-15",
        "name": "Araba 05",
        "slug": "araba-plaka-peakpx-15",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(15).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 05 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(15).webp"
        ]
    },
    "araba-plaka-peakpx-3": {
        "id": "araba-plaka-peakpx-3",
        "name": "Araba 06",
        "slug": "araba-plaka-peakpx-3",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(3).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 06 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(3).webp"
        ]
    },
    "araba-plaka-peakpx-4": {
        "id": "araba-plaka-peakpx-4",
        "name": "Araba 07",
        "slug": "araba-plaka-peakpx-4",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(4).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 07 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(4).webp"
        ]
    },
    "araba-plaka-peakpx-5": {
        "id": "araba-plaka-peakpx-5",
        "name": "Araba 08",
        "slug": "araba-plaka-peakpx-5",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(5).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 08 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(5).webp"
        ]
    },
    "araba-plaka-peakpx-6": {
        "id": "araba-plaka-peakpx-6",
        "name": "Araba 09",
        "slug": "araba-plaka-peakpx-6",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(6).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 09 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(6).webp"
        ]
    },
    "araba-plaka-peakpx-7": {
        "id": "araba-plaka-peakpx-7",
        "name": "Araba 10",
        "slug": "araba-plaka-peakpx-7",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(7).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 10 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(7).webp"
        ]
    },
    "araba-plaka-peakpx-8": {
        "id": "araba-plaka-peakpx-8",
        "name": "Araba 11",
        "slug": "araba-plaka-peakpx-8",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(8).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 11 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(8).webp"
        ]
    },
    "araba-plaka-peakpx-9": {
        "id": "araba-plaka-peakpx-9",
        "name": "Araba 12",
        "slug": "araba-plaka-peakpx-9",
        "price": 350,
        "image": "/products/arabalar-plaka/peakpx%20(9).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ARABA_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Araba 12 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/arabalar-plaka/peakpx%20(9).webp"
        ]
    },
    "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f": {
        "id": "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f",
        "name": "Ataturk 01",
        "slug": "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f",
        "price": 350,
        "image": "/products/ataturk-plaka/157cb5977d3ea1c7d072f5513841565f.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 01 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/157cb5977d3ea1c7d072f5513841565f.webp"
        ]
    },
    "ataturk-plaka-53-v2": {
        "id": "ataturk-plaka-53-v2",
        "name": "Ataturk 02",
        "slug": "ataturk-plaka-53-v2",
        "price": 350,
        "image": "/products/ataturk-plaka/53-v2.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 02 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/53-v2.webp"
        ]
    },
    "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955": {
        "id": "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955",
        "name": "Ataturk 03",
        "slug": "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955",
        "price": 350,
        "image": "/products/ataturk-plaka/78b08d649d514dd7f10d28e563ec2955.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 03 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/78b08d649d514dd7f10d28e563ec2955.webp"
        ]
    },
    "ataturk-plaka-b6e4a72dc26713ac3461177e760397af": {
        "id": "ataturk-plaka-b6e4a72dc26713ac3461177e760397af",
        "name": "Ataturk 04",
        "slug": "ataturk-plaka-b6e4a72dc26713ac3461177e760397af",
        "price": 350,
        "image": "/products/ataturk-plaka/b6e4a72dc26713ac3461177e760397af.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 04 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/b6e4a72dc26713ac3461177e760397af.webp"
        ]
    },
    "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98": {
        "id": "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98",
        "name": "Ataturk 05",
        "slug": "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98",
        "price": 350,
        "image": "/products/ataturk-plaka/e279c3d9bbd2a1cc1228eea744ceab98.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 05 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/e279c3d9bbd2a1cc1228eea744ceab98.webp"
        ]
    },
    "ataturk-plaka-img-6338-2024-11-04-16-37-05": {
        "id": "ataturk-plaka-img-6338-2024-11-04-16-37-05",
        "name": "Ataturk 06",
        "slug": "ataturk-plaka-img-6338-2024-11-04-16-37-05",
        "price": 350,
        "image": "/products/ataturk-plaka/IMG_6338%202024-11-04%2016_37_05.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 06 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/IMG_6338%202024-11-04%2016_37_05.webp"
        ]
    },
    "ataturk-plaka-indir-2": {
        "id": "ataturk-plaka-indir-2",
        "name": "Ataturk 07",
        "slug": "ataturk-plaka-indir-2",
        "price": 350,
        "image": "/products/ataturk-plaka/indir%20(2).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 07 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/indir%20(2).webp"
        ]
    },
    "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f-2": {
        "id": "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f-2",
        "name": "Ataturk 08",
        "slug": "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f-2",
        "price": 350,
        "image": "/products/ataturk-plaka/157cb5977d3ea1c7d072f5513841565f.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 08 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/157cb5977d3ea1c7d072f5513841565f.webp"
        ]
    },
    "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f-3": {
        "id": "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f-3",
        "name": "Ataturk 09",
        "slug": "ataturk-plaka-157cb5977d3ea1c7d072f5513841565f-3",
        "price": 350,
        "image": "/products/ataturk-plaka/157cb5977d3ea1c7d072f5513841565f.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 09 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/157cb5977d3ea1c7d072f5513841565f.webp"
        ]
    },
    "ataturk-plaka-53-v2-2": {
        "id": "ataturk-plaka-53-v2-2",
        "name": "Ataturk 10",
        "slug": "ataturk-plaka-53-v2-2",
        "price": 350,
        "image": "/products/ataturk-plaka/53-v2.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 10 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/53-v2.webp"
        ]
    },
    "ataturk-plaka-53-v2-3": {
        "id": "ataturk-plaka-53-v2-3",
        "name": "Ataturk 11",
        "slug": "ataturk-plaka-53-v2-3",
        "price": 350,
        "image": "/products/ataturk-plaka/53-v2.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 11 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/53-v2.webp"
        ]
    },
    "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955-2": {
        "id": "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955-2",
        "name": "Ataturk 12",
        "slug": "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955-2",
        "price": 350,
        "image": "/products/ataturk-plaka/78b08d649d514dd7f10d28e563ec2955.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 12 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/78b08d649d514dd7f10d28e563ec2955.webp"
        ]
    },
    "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955-3": {
        "id": "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955-3",
        "name": "Ataturk 13",
        "slug": "ataturk-plaka-78b08d649d514dd7f10d28e563ec2955-3",
        "price": 350,
        "image": "/products/ataturk-plaka/78b08d649d514dd7f10d28e563ec2955.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 13 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/78b08d649d514dd7f10d28e563ec2955.webp"
        ]
    },
    "ataturk-plaka-b6e4a72dc26713ac3461177e760397af-2": {
        "id": "ataturk-plaka-b6e4a72dc26713ac3461177e760397af-2",
        "name": "Ataturk 14",
        "slug": "ataturk-plaka-b6e4a72dc26713ac3461177e760397af-2",
        "price": 350,
        "image": "/products/ataturk-plaka/b6e4a72dc26713ac3461177e760397af.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 14 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/b6e4a72dc26713ac3461177e760397af.webp"
        ]
    },
    "ataturk-plaka-b6e4a72dc26713ac3461177e760397af-3": {
        "id": "ataturk-plaka-b6e4a72dc26713ac3461177e760397af-3",
        "name": "Ataturk 15",
        "slug": "ataturk-plaka-b6e4a72dc26713ac3461177e760397af-3",
        "price": 350,
        "image": "/products/ataturk-plaka/b6e4a72dc26713ac3461177e760397af.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 15 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/b6e4a72dc26713ac3461177e760397af.webp"
        ]
    },
    "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98-2": {
        "id": "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98-2",
        "name": "Ataturk 16",
        "slug": "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98-2",
        "price": 350,
        "image": "/products/ataturk-plaka/e279c3d9bbd2a1cc1228eea744ceab98.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 16 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/e279c3d9bbd2a1cc1228eea744ceab98.webp"
        ]
    },
    "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98-3": {
        "id": "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98-3",
        "name": "Ataturk 17",
        "slug": "ataturk-plaka-e279c3d9bbd2a1cc1228eea744ceab98-3",
        "price": 350,
        "image": "/products/ataturk-plaka/e279c3d9bbd2a1cc1228eea744ceab98.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 17 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/e279c3d9bbd2a1cc1228eea744ceab98.webp"
        ]
    },
    "ataturk-plaka-img-6338-2024-11-04-16-37-05-2": {
        "id": "ataturk-plaka-img-6338-2024-11-04-16-37-05-2",
        "name": "Ataturk 18",
        "slug": "ataturk-plaka-img-6338-2024-11-04-16-37-05-2",
        "price": 350,
        "image": "/products/ataturk-plaka/IMG_6338%202024-11-04%2016_37_05.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 18 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/IMG_6338%202024-11-04%2016_37_05.webp"
        ]
    },
    "ataturk-plaka-img-6338-2024-11-04-16-37-05-3": {
        "id": "ataturk-plaka-img-6338-2024-11-04-16-37-05-3",
        "name": "Ataturk 19",
        "slug": "ataturk-plaka-img-6338-2024-11-04-16-37-05-3",
        "price": 350,
        "image": "/products/ataturk-plaka/IMG_6338%202024-11-04%2016_37_05.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 19 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/IMG_6338%202024-11-04%2016_37_05.webp"
        ]
    },
    "ataturk-plaka-indir-2-2": {
        "id": "ataturk-plaka-indir-2-2",
        "name": "Ataturk 20",
        "slug": "ataturk-plaka-indir-2-2",
        "price": 350,
        "image": "/products/ataturk-plaka/indir%20(2).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 20 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/indir%20(2).webp"
        ]
    },
    "ataturk-plaka-indir-2-3": {
        "id": "ataturk-plaka-indir-2-3",
        "name": "Ataturk 21",
        "slug": "ataturk-plaka-indir-2-3",
        "price": 350,
        "image": "/products/ataturk-plaka/indir%20(2).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "ATATURK_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Ataturk 21 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/ataturk-plaka/indir%20(2).webp"
        ]
    },
    "character-plaka-1277": {
        "id": "character-plaka-1277",
        "name": "Karakter 01",
        "slug": "character-plaka-1277",
        "price": 350,
        "image": "/products/karakterler-plaka/1277.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 01 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/1277.webp"
        ]
    },
    "character-plaka-2800x1700": {
        "id": "character-plaka-2800x1700",
        "name": "Karakter 02",
        "slug": "character-plaka-2800x1700",
        "price": 350,
        "image": "/products/karakterler-plaka/2800x1700.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 02 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/2800x1700.webp"
        ]
    },
    "character-plaka-2f282d75f1e29906dd030e291e5e1a7c": {
        "id": "character-plaka-2f282d75f1e29906dd030e291e5e1a7c",
        "name": "Karakter 03",
        "slug": "character-plaka-2f282d75f1e29906dd030e291e5e1a7c",
        "price": 350,
        "image": "/products/karakterler-plaka/2f282d75f1e29906dd030e291e5e1a7c.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 03 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/2f282d75f1e29906dd030e291e5e1a7c.webp"
        ]
    },
    "character-plaka-3f5759e36903a3c0cf0f746f354d504a": {
        "id": "character-plaka-3f5759e36903a3c0cf0f746f354d504a",
        "name": "Karakter 04",
        "slug": "character-plaka-3f5759e36903a3c0cf0f746f354d504a",
        "price": 350,
        "image": "/products/karakterler-plaka/3f5759e36903a3c0cf0f746f354d504a.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 04 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/3f5759e36903a3c0cf0f746f354d504a.webp"
        ]
    },
    "character-plaka-7db49343d3d5e96b4d1ad43ba70e54ec": {
        "id": "character-plaka-7db49343d3d5e96b4d1ad43ba70e54ec",
        "name": "Karakter 05",
        "slug": "character-plaka-7db49343d3d5e96b4d1ad43ba70e54ec",
        "price": 350,
        "image": "/products/karakterler-plaka/7db49343d3d5e96b4d1ad43ba70e54ec.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 05 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/7db49343d3d5e96b4d1ad43ba70e54ec.webp"
        ]
    },
    "character-plaka-92a81d4e91f18899bf5a16b865912788": {
        "id": "character-plaka-92a81d4e91f18899bf5a16b865912788",
        "name": "Karakter 06",
        "slug": "character-plaka-92a81d4e91f18899bf5a16b865912788",
        "price": 350,
        "image": "/products/karakterler-plaka/92a81d4e91f18899bf5a16b865912788.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 06 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/92a81d4e91f18899bf5a16b865912788.webp"
        ]
    },
    "character-plaka-a2f9f9042892abda64e30db84c5a931e": {
        "id": "character-plaka-a2f9f9042892abda64e30db84c5a931e",
        "name": "Karakter 07",
        "slug": "character-plaka-a2f9f9042892abda64e30db84c5a931e",
        "price": 350,
        "image": "/products/karakterler-plaka/a2f9f9042892abda64e30db84c5a931e.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 07 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/a2f9f9042892abda64e30db84c5a931e.webp"
        ]
    },
    "character-plaka-ab1db2f2dff290cd2ed05607056d09b0": {
        "id": "character-plaka-ab1db2f2dff290cd2ed05607056d09b0",
        "name": "Karakter 08",
        "slug": "character-plaka-ab1db2f2dff290cd2ed05607056d09b0",
        "price": 350,
        "image": "/products/karakterler-plaka/ab1db2f2dff290cd2ed05607056d09b0.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 08 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/ab1db2f2dff290cd2ed05607056d09b0.webp"
        ]
    },
    "character-plaka-b34effcfbf3297e0b2ed4d4bea69c9df": {
        "id": "character-plaka-b34effcfbf3297e0b2ed4d4bea69c9df",
        "name": "Karakter 09",
        "slug": "character-plaka-b34effcfbf3297e0b2ed4d4bea69c9df",
        "price": 350,
        "image": "/products/karakterler-plaka/b34effcfbf3297e0b2ed4d4bea69c9df.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 09 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/b34effcfbf3297e0b2ed4d4bea69c9df.webp"
        ]
    },
    "character-plaka-c742eedc17730e270ffb3f16e4f5d4c5": {
        "id": "character-plaka-c742eedc17730e270ffb3f16e4f5d4c5",
        "name": "Karakter 10",
        "slug": "character-plaka-c742eedc17730e270ffb3f16e4f5d4c5",
        "price": 350,
        "image": "/products/karakterler-plaka/c742eedc17730e270ffb3f16e4f5d4c5.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 10 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/c742eedc17730e270ffb3f16e4f5d4c5.webp"
        ]
    },
    "character-plaka-download-cold-beer-vintage-retro-signage-vector-for-free": {
        "id": "character-plaka-download-cold-beer-vintage-retro-signage-vector-for-free",
        "name": "Karakter 11",
        "slug": "character-plaka-download-cold-beer-vintage-retro-signage-vector-for-free",
        "price": 350,
        "image": "/products/karakterler-plaka/Download%20Cold%20Beer%20Vintage%20Retro%20Signage%20Vector%20for%20free.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 11 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/Download%20Cold%20Beer%20Vintage%20Retro%20Signage%20Vector%20for%20free.webp"
        ]
    },
    "character-plaka-francesca-saraco-fc9ydjoooha-unsplash": {
        "id": "character-plaka-francesca-saraco-fc9ydjoooha-unsplash",
        "name": "Karakter 12",
        "slug": "character-plaka-francesca-saraco-fc9ydjoooha-unsplash",
        "price": 350,
        "image": "/products/karakterler-plaka/francesca-saraco-fC9ydjoOOHA-unsplash.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 12 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/francesca-saraco-fC9ydjoOOHA-unsplash.webp"
        ]
    },
    "character-plaka-galeri-gallery": {
        "id": "character-plaka-galeri-gallery",
        "name": "Karakter 13",
        "slug": "character-plaka-galeri-gallery",
        "price": 350,
        "image": "/products/karakterler-plaka/GALER%C4%B0%20%F0%9F%8C%90%F0%9F%94%B6%F0%9F%94%B8%F0%9F%8C%90%20GALLERY.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 13 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/GALER%C4%B0%20%F0%9F%8C%90%F0%9F%94%B6%F0%9F%94%B8%F0%9F%8C%90%20GALLERY.webp"
        ]
    },
    "character-plaka-img-4576": {
        "id": "character-plaka-img-4576",
        "name": "Karakter 14",
        "slug": "character-plaka-img-4576",
        "price": 350,
        "image": "/products/karakterler-plaka/IMG_4576.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 14 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/IMG_4576.webp"
        ]
    },
    "character-plaka-indir-10": {
        "id": "character-plaka-indir-10",
        "name": "Karakter 15",
        "slug": "character-plaka-indir-10",
        "price": 350,
        "image": "/products/karakterler-plaka/indir%20(10).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 15 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/indir%20(10).webp"
        ]
    },
    "character-plaka-indir-3": {
        "id": "character-plaka-indir-3",
        "name": "Karakter 16",
        "slug": "character-plaka-indir-3",
        "price": 350,
        "image": "/products/karakterler-plaka/indir%20(3).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 16 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/indir%20(3).webp"
        ]
    },
    "character-plaka-indir-5": {
        "id": "character-plaka-indir-5",
        "name": "Karakter 17",
        "slug": "character-plaka-indir-5",
        "price": 350,
        "image": "/products/karakterler-plaka/indir%20(5).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 17 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/indir%20(5).webp"
        ]
    },
    "character-plaka-indir-7": {
        "id": "character-plaka-indir-7",
        "name": "Karakter 18",
        "slug": "character-plaka-indir-7",
        "price": 350,
        "image": "/products/karakterler-plaka/indir%20(7).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 18 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/indir%20(7).webp"
        ]
    },
    "character-plaka-kedii-patates": {
        "id": "character-plaka-kedii-patates",
        "name": "Karakter 19",
        "slug": "character-plaka-kedii-patates",
        "price": 350,
        "image": "/products/karakterler-plaka/kedii%20patates.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 19 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/kedii%20patates.webp"
        ]
    },
    "character-plaka-tasarim-poster": {
        "id": "character-plaka-tasarim-poster",
        "name": "Karakter 20",
        "slug": "character-plaka-tasarim-poster",
        "price": 350,
        "image": "/products/karakterler-plaka/tasar%C4%B1m%20poster.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "CHARACTER_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Karakter 20 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/karakterler-plaka/tasar%C4%B1m%20poster.webp"
        ]
    },
    "motor-plaka-136217-scaled": {
        "id": "motor-plaka-136217-scaled",
        "name": "Motor 01",
        "slug": "motor-plaka-136217-scaled",
        "price": 350,
        "image": "/products/motor-plaka/136217-scaled.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 01 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/136217-scaled.webp"
        ]
    },
    "motor-plaka-136258": {
        "id": "motor-plaka-136258",
        "name": "Motor 02",
        "slug": "motor-plaka-136258",
        "price": 350,
        "image": "/products/motor-plaka/136258.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 02 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/136258.webp"
        ]
    },
    "motor-plaka-349472": {
        "id": "motor-plaka-349472",
        "name": "Motor 03",
        "slug": "motor-plaka-349472",
        "price": 350,
        "image": "/products/motor-plaka/349472.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 03 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/349472.webp"
        ]
    },
    "motor-plaka-477445": {
        "id": "motor-plaka-477445",
        "name": "Motor 04",
        "slug": "motor-plaka-477445",
        "price": 350,
        "image": "/products/motor-plaka/477445.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 04 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/477445.webp"
        ]
    },
    "motor-plaka-bmw-logo": {
        "id": "motor-plaka-bmw-logo",
        "name": "Motor 05",
        "slug": "motor-plaka-bmw-logo",
        "price": 350,
        "image": "/products/motor-plaka/BMW%20Logo.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 05 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/BMW%20Logo.webp"
        ]
    },
    "motor-plaka-bmw-motorcycles-desktop-wallpaper": {
        "id": "motor-plaka-bmw-motorcycles-desktop-wallpaper",
        "name": "Motor 06",
        "slug": "motor-plaka-bmw-motorcycles-desktop-wallpaper",
        "price": 350,
        "image": "/products/motor-plaka/Bmw%20Motorcycles%20Desktop%20Wallpaper.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 06 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/Bmw%20Motorcycles%20Desktop%20Wallpaper.webp"
        ]
    },
    "motor-plaka-bmw-wallpaper-4k-logo": {
        "id": "motor-plaka-bmw-wallpaper-4k-logo",
        "name": "Motor 07",
        "slug": "motor-plaka-bmw-wallpaper-4k-logo",
        "price": 350,
        "image": "/products/motor-plaka/Bmw%20Wallpaper%204k%20Logo.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 07 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/Bmw%20Wallpaper%204k%20Logo.webp"
        ]
    },
    "motor-plaka-desert-drift-harley-rider-on-the-open-road": {
        "id": "motor-plaka-desert-drift-harley-rider-on-the-open-road",
        "name": "Motor 08",
        "slug": "motor-plaka-desert-drift-harley-rider-on-the-open-road",
        "price": 350,
        "image": "/products/motor-plaka/Desert%20Drift%20%E2%80%93%20Harley%20Rider%20on%20the%20Open%20Road.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 08 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/Desert%20Drift%20%E2%80%93%20Harley%20Rider%20on%20the%20Open%20Road.webp"
        ]
    },
    "motor-plaka-ducati": {
        "id": "motor-plaka-ducati",
        "name": "Motor 09",
        "slug": "motor-plaka-ducati",
        "price": 350,
        "image": "/products/motor-plaka/DUCATI.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 09 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/DUCATI.webp"
        ]
    },
    "motor-plaka-dzkfbsz-harley-davidson-symbol-images": {
        "id": "motor-plaka-dzkfbsz-harley-davidson-symbol-images",
        "name": "Motor 10",
        "slug": "motor-plaka-dzkfbsz-harley-davidson-symbol-images",
        "price": 350,
        "image": "/products/motor-plaka/dzkFbSz-harley-davidson-symbol-images.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 10 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/dzkFbSz-harley-davidson-symbol-images.webp"
        ]
    },
    "motor-plaka-indir-14": {
        "id": "motor-plaka-indir-14",
        "name": "Motor 11",
        "slug": "motor-plaka-indir-14",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(14).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 11 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(14).webp"
        ]
    },
    "motor-plaka-indir-15": {
        "id": "motor-plaka-indir-15",
        "name": "Motor 12",
        "slug": "motor-plaka-indir-15",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(15).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 12 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(15).webp"
        ]
    },
    "motor-plaka-indir-2": {
        "id": "motor-plaka-indir-2",
        "name": "Motor 13",
        "slug": "motor-plaka-indir-2",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(2).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 13 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(2).webp"
        ]
    },
    "motor-plaka-indir-3": {
        "id": "motor-plaka-indir-3",
        "name": "Motor 14",
        "slug": "motor-plaka-indir-3",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(3).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 14 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(3).webp"
        ]
    },
    "motor-plaka-indir-4": {
        "id": "motor-plaka-indir-4",
        "name": "Motor 15",
        "slug": "motor-plaka-indir-4",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(4).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 15 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(4).webp"
        ]
    },
    "motor-plaka-indir-5": {
        "id": "motor-plaka-indir-5",
        "name": "Motor 16",
        "slug": "motor-plaka-indir-5",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(5).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 16 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(5).webp"
        ]
    },
    "motor-plaka-indir-6": {
        "id": "motor-plaka-indir-6",
        "name": "Motor 17",
        "slug": "motor-plaka-indir-6",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(6).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 17 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(6).webp"
        ]
    },
    "motor-plaka-indir-6-2": {
        "id": "motor-plaka-indir-6-2",
        "name": "Motor 18",
        "slug": "motor-plaka-indir-6-2",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(6).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 18 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(6).webp"
        ]
    },
    "motor-plaka-indir-9": {
        "id": "motor-plaka-indir-9",
        "name": "Motor 19",
        "slug": "motor-plaka-indir-9",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(9).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 19 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(9).webp"
        ]
    },
    "motor-plaka-kawasaki": {
        "id": "motor-plaka-kawasaki",
        "name": "Motor 20",
        "slug": "motor-plaka-kawasaki",
        "price": 350,
        "image": "/products/motor-plaka/kawasaki.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 20 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/kawasaki.webp"
        ]
    },
    "motor-plaka-old-school": {
        "id": "motor-plaka-old-school",
        "name": "Motor 21",
        "slug": "motor-plaka-old-school",
        "price": 350,
        "image": "/products/motor-plaka/Old%20school_.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 21 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/Old%20school_.webp"
        ]
    },
    "motor-plaka-peakpx-3": {
        "id": "motor-plaka-peakpx-3",
        "name": "Motor 22",
        "slug": "motor-plaka-peakpx-3",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(3).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 22 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(3).webp"
        ]
    },
    "motor-plaka-peakpx-5": {
        "id": "motor-plaka-peakpx-5",
        "name": "Motor 23",
        "slug": "motor-plaka-peakpx-5",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(5).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 23 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(5).webp"
        ]
    },
    "motor-plaka-pexels-giorgio-de-angelis-482403-1289539": {
        "id": "motor-plaka-pexels-giorgio-de-angelis-482403-1289539",
        "name": "Motor 24",
        "slug": "motor-plaka-pexels-giorgio-de-angelis-482403-1289539",
        "price": 350,
        "image": "/products/motor-plaka/pexels-giorgio-de-angelis-482403-1289539.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 24 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/pexels-giorgio-de-angelis-482403-1289539.webp"
        ]
    },
    "motor-plaka-ugyguji": {
        "id": "motor-plaka-ugyguji",
        "name": "Motor 25",
        "slug": "motor-plaka-ugyguji",
        "price": 350,
        "image": "/products/motor-plaka/ugyguj%C4%B1.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 25 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/ugyguj%C4%B1.webp"
        ]
    },
    "motor-plaka-view-cool-powerful-motorcycle-1": {
        "id": "motor-plaka-view-cool-powerful-motorcycle-1",
        "name": "Motor 26",
        "slug": "motor-plaka-view-cool-powerful-motorcycle-1",
        "price": 350,
        "image": "/products/motor-plaka/view-cool-powerful-motorcycle%20(1).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 26 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/view-cool-powerful-motorcycle%20(1).webp"
        ]
    },
    "motor-plaka-wp2441539-kawasaki-logo-wallpapers": {
        "id": "motor-plaka-wp2441539-kawasaki-logo-wallpapers",
        "name": "Motor 27",
        "slug": "motor-plaka-wp2441539-kawasaki-logo-wallpapers",
        "price": 350,
        "image": "/products/motor-plaka/wp2441539-kawasaki-logo-wallpapers.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 27 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/wp2441539-kawasaki-logo-wallpapers.webp"
        ]
    },
    "motor-plaka-wp2832601-honda-motorcycle-logo-wallpaper-1": {
        "id": "motor-plaka-wp2832601-honda-motorcycle-logo-wallpaper-1",
        "name": "Motor 28",
        "slug": "motor-plaka-wp2832601-honda-motorcycle-logo-wallpaper-1",
        "price": 350,
        "image": "/products/motor-plaka/wp2832601-honda-motorcycle-logo-wallpaper%20(1).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 28 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/wp2832601-honda-motorcycle-logo-wallpaper%20(1).webp"
        ]
    },
    "motor-plaka-wp2832601-honda-motorcycle-logo-wallpaper": {
        "id": "motor-plaka-wp2832601-honda-motorcycle-logo-wallpaper",
        "name": "Motor 29",
        "slug": "motor-plaka-wp2832601-honda-motorcycle-logo-wallpaper",
        "price": 350,
        "image": "/products/motor-plaka/wp2832601-honda-motorcycle-logo-wallpaper.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 29 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/wp2832601-honda-motorcycle-logo-wallpaper.webp"
        ]
    },
    "motor-plaka-1050a35e9dd145fd0c3e9731271218b3": {
        "id": "motor-plaka-1050a35e9dd145fd0c3e9731271218b3",
        "name": "Motor 30",
        "slug": "motor-plaka-1050a35e9dd145fd0c3e9731271218b3",
        "price": 350,
        "image": "/products/motor-plaka/1050a35e9dd145fd0c3e9731271218b3.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 30 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/1050a35e9dd145fd0c3e9731271218b3.webp"
        ]
    },
    "motor-plaka-30f1c4b41f2f1276d3cd6f8c470d4280": {
        "id": "motor-plaka-30f1c4b41f2f1276d3cd6f8c470d4280",
        "name": "Motor 31",
        "slug": "motor-plaka-30f1c4b41f2f1276d3cd6f8c470d4280",
        "price": 350,
        "image": "/products/motor-plaka/30f1c4b41f2f1276d3cd6f8c470d4280.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 31 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/30f1c4b41f2f1276d3cd6f8c470d4280.webp"
        ]
    },
    "motor-plaka-4f1ac3a9c1b6aaba0213dbe88a3c0996": {
        "id": "motor-plaka-4f1ac3a9c1b6aaba0213dbe88a3c0996",
        "name": "Motor 32",
        "slug": "motor-plaka-4f1ac3a9c1b6aaba0213dbe88a3c0996",
        "price": 350,
        "image": "/products/motor-plaka/4f1ac3a9c1b6aaba0213dbe88a3c0996.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 32 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/4f1ac3a9c1b6aaba0213dbe88a3c0996.webp"
        ]
    },
    "motor-plaka-american-style": {
        "id": "motor-plaka-american-style",
        "name": "Motor 33",
        "slug": "motor-plaka-american-style",
        "price": 350,
        "image": "/products/motor-plaka/american%20style%20.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 33 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/american%20style%20.webp"
        ]
    },
    "motor-plaka-chris-pfeiffer-bmw-motorcycle-wide-high-definition": {
        "id": "motor-plaka-chris-pfeiffer-bmw-motorcycle-wide-high-definition",
        "name": "Motor 34",
        "slug": "motor-plaka-chris-pfeiffer-bmw-motorcycle-wide-high-definition",
        "price": 350,
        "image": "/products/motor-plaka/Chris%20Pfeiffer%20Bmw%20Motorcycle%20Wide%20High%20Definition.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 34 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/Chris%20Pfeiffer%20Bmw%20Motorcycle%20Wide%20High%20Definition.webp"
        ]
    },
    "motor-plaka-chrome-surge-skull-harley-davidson-water-engine-power-by-martyrider": {
        "id": "motor-plaka-chrome-surge-skull-harley-davidson-water-engine-power-by-martyrider",
        "name": "Motor 35",
        "slug": "motor-plaka-chrome-surge-skull-harley-davidson-water-engine-power-by-martyrider",
        "price": 350,
        "image": "/products/motor-plaka/Chrome%20Surge%20Skull%20%E2%80%93%20Harley%20Davidson%20Water%20Engine%20Power%20by%20Martyrider.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 35 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/Chrome%20Surge%20Skull%20%E2%80%93%20Harley%20Davidson%20Water%20Engine%20Power%20by%20Martyrider.webp"
        ]
    },
    "motor-plaka-d4dc2a4491cb82ecff2d8ac12ebfce7e": {
        "id": "motor-plaka-d4dc2a4491cb82ecff2d8ac12ebfce7e",
        "name": "Motor 36",
        "slug": "motor-plaka-d4dc2a4491cb82ecff2d8ac12ebfce7e",
        "price": 350,
        "image": "/products/motor-plaka/d4dc2a4491cb82ecff2d8ac12ebfce7e.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 36 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/d4dc2a4491cb82ecff2d8ac12ebfce7e.webp"
        ]
    },
    "motor-plaka-f1cfebd0cd1e47b94115bc2ad7911456": {
        "id": "motor-plaka-f1cfebd0cd1e47b94115bc2ad7911456",
        "name": "Motor 37",
        "slug": "motor-plaka-f1cfebd0cd1e47b94115bc2ad7911456",
        "price": 350,
        "image": "/products/motor-plaka/f1cfebd0cd1e47b94115bc2ad7911456.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 37 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/f1cfebd0cd1e47b94115bc2ad7911456.webp"
        ]
    },
    "motor-plaka-f313c4773fb5939602c4370b3883e15a": {
        "id": "motor-plaka-f313c4773fb5939602c4370b3883e15a",
        "name": "Motor 38",
        "slug": "motor-plaka-f313c4773fb5939602c4370b3883e15a",
        "price": 350,
        "image": "/products/motor-plaka/f313c4773fb5939602c4370b3883e15a.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 38 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/f313c4773fb5939602c4370b3883e15a.webp"
        ]
    },
    "motor-plaka-hd-wallpaper-harley-davidson-motorcycle": {
        "id": "motor-plaka-hd-wallpaper-harley-davidson-motorcycle",
        "name": "Motor 39",
        "slug": "motor-plaka-hd-wallpaper-harley-davidson-motorcycle",
        "price": 350,
        "image": "/products/motor-plaka/HD-wallpaper-harley-davidson-motorcycle.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 39 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/HD-wallpaper-harley-davidson-motorcycle.webp"
        ]
    },
    "motor-plaka-img-4564": {
        "id": "motor-plaka-img-4564",
        "name": "Motor 40",
        "slug": "motor-plaka-img-4564",
        "price": 350,
        "image": "/products/motor-plaka/IMG_4564.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 40 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/IMG_4564.webp"
        ]
    },
    "motor-plaka-indir-8": {
        "id": "motor-plaka-indir-8",
        "name": "Motor 41",
        "slug": "motor-plaka-indir-8",
        "price": 350,
        "image": "/products/motor-plaka/indir%20(8).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 41 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir%20(8).webp"
        ]
    },
    "motor-plaka-indir": {
        "id": "motor-plaka-indir",
        "name": "Motor 42",
        "slug": "motor-plaka-indir",
        "price": 350,
        "image": "/products/motor-plaka/indir.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 42 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/indir.webp"
        ]
    },
    "motor-plaka-peakpx-10": {
        "id": "motor-plaka-peakpx-10",
        "name": "Motor 43",
        "slug": "motor-plaka-peakpx-10",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(10).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 43 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(10).webp"
        ]
    },
    "motor-plaka-peakpx-11": {
        "id": "motor-plaka-peakpx-11",
        "name": "Motor 44",
        "slug": "motor-plaka-peakpx-11",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(11).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 44 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(11).webp"
        ]
    },
    "motor-plaka-peakpx-12": {
        "id": "motor-plaka-peakpx-12",
        "name": "Motor 45",
        "slug": "motor-plaka-peakpx-12",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(12).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 45 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(12).webp"
        ]
    },
    "motor-plaka-peakpx-13": {
        "id": "motor-plaka-peakpx-13",
        "name": "Motor 46",
        "slug": "motor-plaka-peakpx-13",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(13).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 46 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(13).webp"
        ]
    },
    "motor-plaka-peakpx-14": {
        "id": "motor-plaka-peakpx-14",
        "name": "Motor 47",
        "slug": "motor-plaka-peakpx-14",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(14).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 47 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(14).webp"
        ]
    },
    "motor-plaka-peakpx-4": {
        "id": "motor-plaka-peakpx-4",
        "name": "Motor 48",
        "slug": "motor-plaka-peakpx-4",
        "price": 350,
        "image": "/products/motor-plaka/peakpx%20(4).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 48 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/peakpx%20(4).webp"
        ]
    },
    "motor-plaka-pexels-efrem-efre-2786187-28383583": {
        "id": "motor-plaka-pexels-efrem-efre-2786187-28383583",
        "name": "Motor 49",
        "slug": "motor-plaka-pexels-efrem-efre-2786187-28383583",
        "price": 350,
        "image": "/products/motor-plaka/pexels-efrem-efre-2786187-28383583.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 49 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/pexels-efrem-efre-2786187-28383583.webp"
        ]
    },
    "motor-plaka-pexels-yash-dhongade-1653701-3158136": {
        "id": "motor-plaka-pexels-yash-dhongade-1653701-3158136",
        "name": "Motor 50",
        "slug": "motor-plaka-pexels-yash-dhongade-1653701-3158136",
        "price": 350,
        "image": "/products/motor-plaka/pexels-yash-dhongade-1653701-3158136.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 50 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/pexels-yash-dhongade-1653701-3158136.webp"
        ]
    },
    "motor-plaka-vespe": {
        "id": "motor-plaka-vespe",
        "name": "Motor 51",
        "slug": "motor-plaka-vespe",
        "price": 350,
        "image": "/products/motor-plaka/VESPE.webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "MOTOR_PLAKA",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Motor 51 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/motor-plaka/VESPE.webp"
        ]
    },
    "yapay-city-indir-10": {
        "id": "yapay-city-indir-10",
        "name": "Yapay City 01",
        "slug": "yapay-city-indir-10",
        "price": 350,
        "image": "/products/yapay-city/indir%20(10).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "YAPAY_CITY",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Yapay City 01 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/yapay-city/indir%20(10).webp"
        ]
    },
    "yapay-city-indir-7": {
        "id": "yapay-city-indir-7",
        "name": "Yapay City 02",
        "slug": "yapay-city-indir-7",
        "price": 350,
        "image": "/products/yapay-city/indir%20(7).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "YAPAY_CITY",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Yapay City 02 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/yapay-city/indir%20(7).webp"
        ]
    },
    "yapay-city-indir-8": {
        "id": "yapay-city-indir-8",
        "name": "Yapay City 03",
        "slug": "yapay-city-indir-8",
        "price": 350,
        "image": "/products/yapay-city/indir%20(8).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "YAPAY_CITY",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Yapay City 03 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/yapay-city/indir%20(8).webp"
        ]
    },
    "yapay-city-indir-9": {
        "id": "yapay-city-indir-9",
        "name": "Yapay City 04",
        "slug": "yapay-city-indir-9",
        "price": 350,
        "image": "/products/yapay-city/indir%20(9).webp",
        "description": "Premium metal poster. 1.5mm aluminum, UV digital print, built to last.",
        "story": "Crafted for bold walls. Clean metal finish, vibrant colors, and gallery-grade detail.",
        "category": "YAPAY_CITY",
        "specs": {
            "material": "Aluminum",
            "process": "UV Print",
            "print": "4K",
            "thickness": "1.5mm",
            "dims": "30x45cm",
            "mounting": "Magnetic"
        },
        "seo": {
            "title": "Yapay City 04 Metal Poster",
            "description": "Premium aluminum metal poster with vivid UV print. Durable and ready to hang.",
            "keywords": [
                "metal poster",
                "aluminum",
                "wall art",
                "premium"
            ]
        },
        "images": [
            "/products/yapay-city/indir%20(9).webp"
        ]
    }
};

export const PRODUCTS: Product[] = Object.values(PRODUCTS_DATA);
