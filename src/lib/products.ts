export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string; // Kapak görseli
    images?: {
        xs?: string;
        s?: string;
        m?: string;
        l?: string;
        xl?: string;
    };
    description: string;
    story: string;
    category: string;
    specs: {
        material: string;
        process: string;
        print: string;
        thickness: string;
        dims: string;
        mounting: string;
    };
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
}

export const PRODUCTS: Product[] = [
    // ===== OTOMOBİL SERİSİ (CARS) =====
    {
        id: "CARS_01",
        name: "Veral Torna & Teneke | Klasik Ford Mustang GT | 1.5mm Alüminyum Metal Tablo | Retro Garaj Dekoru",
        slug: "klasik-ford-mustang-gt-metal-tablo",
        price: 350,
        image: "/catalog/cars/cars_01.webp",
        description: "Amerikan kası efsanesi Ford Mustang'in endüstriyel yorumu. 1.5mm uçak sınıfı alüminyum üzerine işlenmiş, yıllara meydan okuyan bir sanat eseri.",
        category: "ARABA_PLAKA",
        story: "1960'ların özgürlük rüzgarını ve Amerikan mühendisliğinin zirvesini duvarlarınıza taşıyoruz. Ford Mustang, sadece bir otomobil değil, bir yaşam tarzı ikonudur.",
        specs: { material: "6061-T6 Alüminyum", process: "UV Dijital Baskı", print: "Veral-Gen3 Pigment", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Ford Mustang GT Metal Tablo | Veral Torna & Teneke", description: "Klasik Mustang metal poster. 1.5mm alüminyum, solmaz UV baskı.", keywords: ["mustang tablo", "metal poster"] }
    },
    {
        id: "CARS_02",
        name: "Veral Torna & Teneke | Vintage Porsche 911 Carrera | Fırçalanmış Metal Poster | Minimalist Ofis Sanatı",
        slug: "vintage-porsche-911-carrera-metal-poster",
        price: 350,
        image: "/catalog/cars/cars_02.webp",
        description: "Alman mühendisliğinin zamansız tasarımı Porsche 911. Mekanik mükemmelliği estetikle buluşturan, koleksiyonluk bir metal baskı.",
        category: "ARABA_PLAKA",
        story: "Hızın ve zarafetin sembolü Porsche 911, Veral Torna & Teneke'in metal işleme ustalığıyla buluştu.",
        specs: { material: "5052 Alüminyum", process: "UV Baskı", print: "Arşivsel Mürekkep", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Porsche 911 Metal Poster | Minimalist Ofis Dekoru", description: "Porsche 911 Carrera metal tablo. Endüstriyel tasarım.", keywords: ["porsche tablo", "ofis dekoru"] }
    },
    {
        id: "CARS_03",
        name: "Veral Torna & Teneke | Klasik Kırmızı Chevrolet Corvette | UV Baskı Metal Levha | Amerikan Retro Stil",
        slug: "klasik-chevrolet-corvette-metal-levha",
        price: 350,
        image: "/catalog/cars/cars_03.webp",
        description: "Corvette'in ateşli kırmızısı ve krom detayları metal üzerinde parlıyor. Retro Amerikan tarzını sevenler için.",
        category: "ARABA_PLAKA",
        story: "Amerikan rüyasının en hızlı temsilcisi Corvette, şimdi duvarlarınızı süslemeye hazır.",
        specs: { material: "Alüminyum Alaşım", process: "UV Baskı", print: "Yüksek Parlaklık", thickness: "1.5 MM", dims: "30x45cm", mounting: "Vida Delikli" },
        seo: { title: "Chevrolet Corvette Metal Tablo | Retro Stil", description: "Kırmızı Corvette metal poster. Amerikan klasik serisi.", keywords: ["corvette tablo", "retro poster"] }
    },
    {
        id: "CARS_04",
        name: "Veral Torna & Teneke | Retro Volkswagen Beetle | Turkuaz Vosvos Metal Poster | Nostaljik Duvar Süsü",
        slug: "retro-volkswagen-beetle-metal-poster",
        price: 350,
        image: "/catalog/cars/cars_04.webp",
        description: "Herkesin sevgilisi Vosvos, şimdi metalin sağlamlığıyla. Neşeli, renkli ve nostaljik bir dokunuş.",
        category: "ARABA_PLAKA",
        story: "Barışın ve özgürlüğün sembolü Vosvos, en renkli haliyle Veral koleksiyonunda.",
        specs: { material: "Hafif Alüminyum", process: "UV Baskı", print: "Yüksek Sabitleme", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Volkswagen Beetle Metal Tablo | Nostaljik Dekor", description: "Turkuaz Vosvos metal poster. Nostaljik duvar sanatı.", keywords: ["vosvos tablo", "beetle poster"] }
    },
    {
        id: "CARS_05",
        name: "Veral Torna & Teneke | Formula 1 Grand Prix | Teknik Şema Metal Tablo | Mühendislik Sanatı",
        slug: "formula-1-grand-prix-teknik-sema",
        price: 350,
        image: "/catalog/cars/cars_05.webp",
        description: "Aerodinamiğin zirvesi. F1 aracının detaylı teknik şeması, saf alüminyum üzerine yüksek çözünürlüklü baskı.",
        category: "ARABA_PLAKA",
        story: "Hızın ve teknolojinin buluştuğu nokta: Formula 1. Bu teknik şema, mühendislik tutkunları için tasarlandı.",
        specs: { material: "Sert Alüminyum", process: "Blueprint Baskı", print: "Veral-Gen3", thickness: "1.5 MM", dims: "30x45cm", mounting: "Vida Delikli" },
        seo: { title: "F1 Teknik Şema Metal Tablo | Mühendislik Sanatı", description: "Formula 1 teknik çizim metal poster. Ofis ve çalışma odası dekoru.", keywords: ["f1 tablo", "teknik çizim"] }
    },
    {
        id: "CARS_06",
        name: "Veral Torna & Teneke | Ferrari 250 GTO | Kırmızı Efsane Metal Plaka | Klasik Spor Araba",
        slug: "ferrari-250-gto-kirmizi-efsane",
        price: 350,
        image: "/catalog/cars/cars_06.webp",
        description: "Dünyanın en değerli otomobili Ferrari 250 GTO. İtalyan kırmızısının en derin tonları metalde hayat buluyor.",
        category: "ARABA_PLAKA",
        story: "Saf İtalyan tutkusu. Ferrari 250 GTO, otomobil tarihinin en ikonik parçasıdır.",
        specs: { material: "Premium Alüminyum", process: "Derin Renk UV", print: "Yüksek Kontrast", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Ferrari 250 GTO Metal Tablo | Klasik Efsane", description: "Ferrari 250 GTO metal poster. İtalyan spor araba serisi.", keywords: ["ferrari tablo", "spor araba"] }
    },
    {
        id: "CARS_07",
        name: "Veral Torna & Teneke | BMW M3 E30 | DTM Yarış Ruhu Metal Poster | Alman Klasik",
        slug: "bmw-m3-e30-dtm-yaris-ruhu",
        price: 350,
        image: "/catalog/cars/cars_07.webp",
        description: "Pistlerin efsanesi BMW E30 M3. Agresif tasarımı ve DTM renkleriyle gerçek bir koleksiyon parçası.",
        category: "ARABA_PLAKA",
        story: "90'ların unutulmaz yarış ikonu. BMW E30 M3, performansın ve tasarımın kusursuz birleşimidir.",
        specs: { material: "Mekanik Alüminyum", process: "Hassas UV Baskı", print: "Veral-Gen3", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "BMW E30 M3 Metal Tablo | DTM Yarış Ruhu", description: "BMW M3 E30 metal poster. Alman yarış klasiği.", keywords: ["bmw tablo", "m3 poster"] }
    },
    {
        id: "CARS_08",
        name: "Veral Torna & Teneke | Land Rover Defender | Off-Road Serüveni Metal Tablo | Macera Ruhu",
        slug: "land-rover-defender-off-road-seruveni",
        price: 350,
        image: "/catalog/cars/cars_08.webp",
        description: "Dağ, taş, çamur... Keşif ruhunun en güçlü temsilcisi Defender, şimdi duvarlarınızda.",
        category: "ARABA_PLAKA",
        story: "Yolun bittiği yerde o başlar. Land Rover Defender, dayanıklılığın ve maceranın sembolüdür.",
        specs: { material: "Sert Alüminyum", process: "Dış Mekan Dayanımlı", print: "Arşivsel Sınıf", thickness: "1.5 MM", dims: "30x45cm", mounting: "Vida Delikli" },
        seo: { title: "Defender Metal Tablo | Off-Road Macera", description: "Land Rover Defender metal poster. Macera ve keşif teması.", keywords: ["defender tablo", "offroad poster"] }
    },
    {
        id: "CARS_09",
        name: "Veral Torna & Teneke | Mercedes-Benz 300SL Gullwing | Gümüş Kanat Metal Tablo | Lüks Klasik",
        slug: "mercedes-300sl-gullwing-gumus-kanat",
        price: 350,
        image: "/catalog/cars/cars_09.webp",
        description: "Yukarı açılan kapılarıyla bir devrim: 300SL Gullwing. Metalik gümüş zemin üzerinde eşsiz bir zarafet.",
        category: "ARABA_PLAKA",
        story: "Zarafetin ve lüksün zirvesi. Mercedes-Benz 300SL, otomobil dünyasının en şık tasarımlarından biridir.",
        specs: { material: "Gümüş Efektli Alüminyum", process: "Parlak UV", print: "Yüksek Çözünürlük", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Mercedes 300SL Metal Tablo | Lüks Klasik", description: "Mercedes 300SL Gullwing metal poster. Gümüş serisi.", keywords: ["mercedes tablo", "lüks klasik"] }
    },
    {
        id: "CARS_10",
        name: "Veral Torna & Teneke | Dodge Challenger RT | Muscle Car Enerjisi Metal Tablo | Amerikan Gücü",
        slug: "dodge-challenger-rt-muscle-car",
        price: 350,
        image: "/catalog/cars/cars_10.webp",
        description: "Ham güç ve agresif duruş. Dodge Challenger RT, Amerikan kas arabası kültürünün en sert temsilcisi.",
        category: "ARABA_PLAKA",
        story: "Yolların hakimi. Dodge Challenger, duruşuyla ve sesiyle Amerikan otomobil ruhunu yansıtır.",
        specs: { material: "Ağır Gövde Alüminyum", process: "Canlı Renk UV", print: "Veral-Gen3", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Dodge Challenger Metal Tablo | Amerikan Gücü", description: "Dodge Challenger RT metal poster. Muscle car koleksiyonu.", keywords: ["dodge tablo", "muscle car"] }
    },
    {
        id: "CARS_11",
        name: "Veral Torna & Teneke | Shelby Cobra 427 | Yarış Efsanesi Metal Tablo | Saf Performans",
        slug: "shelby-cobra-427-yaris-efsanesi",
        price: 350,
        image: "/catalog/cars/cars_11.webp",
        description: "Carroll Shelby'nin efsanesi Cobra 427. Saf güç ve eşsiz tasarımın alüminyumla buluşması.",
        category: "ARABA_PLAKA",
        story: "Vahşi ve kontrol edilemez. Shelby Cobra, yarış tarihinin en korkutucu ve sevilen araçlarından biridir.",
        specs: { material: "Premium Alüminyum", process: "Hassas Renk UV", print: "Arşivsel", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Shelby Cobra Metal Tablo | Yarış Efsanesi", description: "Shelby Cobra 427 metal poster. Performans serisi.", keywords: ["shelby cobra", "metal tablo"] }
    },
    {
        id: "CARS_12",
        name: "Veral Torna & Teneke | Aston Martin DB5 | James Bond Klasiği Metal Tablo | İngiliz Zarafeti",
        slug: "aston-martin-db5-james-bond-klasigi",
        price: 350,
        image: "/catalog/cars/cars_12.webp",
        description: "Ajanların tercihi. Aston Martin DB5, İngiliz asaletini ve James Bond dünyasını duvarlarınıza taşır.",
        category: "ARABA_PLAKA",
        story: "Adı Bond, James Bond. DB5, bir otomobilden fazlası; gizemin ve şıklığın ikonudur.",
        specs: { material: "Gümüş Tonlu Alüminyum", process: "Yüksek Kalite UV", print: "Veral-Gen3", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Aston Martin DB5 Metal Tablo | Bond Klasiği", description: "Aston Martin DB5 metal poster. James Bond koleksiyonu.", keywords: ["aston martin", "bond tablo"] }
    },

    // ===== ATATÜRK ÖZEL SERİSİ (ATATURK) =====
    {
        id: "ATATURK_01",
        name: "Veral Torna & Teneke | Başkomutan Atatürk | Karizmatik Portre Metal Tablo | Koleksiyonluk",
        slug: "baskomutan-ataturk-karizmatik-portre",
        price: 350,
        image: "/catalog/ataturk/ataturk_01.webp",
        description: "Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk'ün en karizmatik ve vakur portresi, 1.5mm alüminyum üzerine işlendi.",
        category: "ATATURK_PLAKA",
        story: "Geleceğin teminatı. Atatürk'ün bakışlarındaki kararlılık, metalin gücüyle birleşerek evinizin baş köşesinde yerini alacak.",
        specs: { material: "Premium Alüminyum", process: "Sanatsal UV Baskı", print: "Gümüş Efektli", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Atatürk Metal Portre | Veral Torna & Teneke", description: "Atatürk karizmatik metal poster. Yüksek kalite alüminyum baskı.", keywords: ["atatürk tablo", "atatürk portre"] }
    },
    {
        id: "ATATURK_02",
        name: "Veral Torna & Teneke | Gazi Mustafa Kemal | Modern Hat Sanatı Metal Tablo | Ofis Dekoru",
        slug: "gazi-mustafa-kemal-modern-hat",
        price: 350,
        image: "/catalog/ataturk/ataturk_02.webp",
        description: "Atatürk'ün silüeti ve modern tasarım çizgileri. Ofisinizde prestijli bir atmosfer yaratacak sanatsal bir eser.",
        category: "ATATURK_PLAKA",
        story: "Fikirlerin ışığı. Bu tasarımda Atatürk'ün vizyonunu modern çizgilerle metal üzerine aktardık.",
        specs: { material: "Siyah Eloksal Alüminyum", process: "Lazer Efektli UV", print: "Beyaz Kontrast", thickness: "1.5 MM", dims: "30x45cm", mounting: "Vida Delikli" },
        seo: { title: "Mustafa Kemal Atatürk Metal Tablo | Modern Tasarım", description: "Modern Atatürk silüeti metal poster. Ofis dekoru için ideal.", keywords: ["atatürk silüeti", "modern tablo"] }
    },
    {
        id: "ATATURK_03",
        name: "Veral Torna & Teneke | Atatürk ve Cumhuriyet | Tarihsel Belge Metal Tablo | Arşivsel",
        slug: "ataturk-ve-cumhuriyet-tarihsel-belge",
        price: 350,
        image: "/catalog/ataturk/ataturk_03.webp",
        description: "Cumhuriyet tarihinin unutulmaz anı. Atatürk'ün tarihi karesi, arşivsel sınıf metal baskı ile koruma altında.",
        category: "ATATURK_PLAKA",
        story: "Tarihin tozlu sayfalarından duvarlarınıza. Cumhuriyet'in kuruluş ruhunu hissettiren nadide bir parça.",
        specs: { material: "Antik Dokulu Alüminyum", process: "Sepia Tonlu UV", print: "Arşivsel Mürekkep", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Cumhuriyet Temalı Atatürk Metal Tablo", description: "Atatürk tarihsel fotoğraf metal poster. Cumhuriyet serisi.", keywords: ["cumhuriyet tablo", "atatürk fotoğraf"] }
    },
    {
        id: "ATATURK_04",
        name: "Veral Torna & Teneke | Mavi Gözlü Dev | İkonik Bakış Metal Tablo | Dekoratif Sanat",
        slug: "mavi-gozlü-dev-ikonik-bakis",
        price: 350,
        image: "/catalog/ataturk/ataturk_04.webp",
        description: "Gözlerindeki ışıkla yolumuzu aydınlatan lider. Atatürk'ün en bilinen ve sevilen bakışlarından biri metalde.",
        category: "ATATURK_PLAKA",
        story: "Derin ve anlamlı. Atatürk'ün ikonik bakışlarını yüksek çözünürlüklü UV baskı ile ölümsüzleştirdik.",
        specs: { material: "Premium Alüminyum", process: "Canlı Renk UV", print: "Veral-Gen3", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "İkonik Atatürk Bakışı Metal Tablo", description: "Atatürk ikonik bakış metal poster. Dekoratif duvar sanatı.", keywords: ["mavi gözlü dev", "atatürk bakış"] }
    },
    {
        id: "ATATURK_05",
        name: "Veral Torna & Teneke | Atatürk İmzalı | Minimalist Metal Plaka | Prestij Serisi",
        slug: "ataturk-imzali-minimalist-plaka",
        price: 350,
        image: "/catalog/ataturk/ataturk_05.webp",
        description: "En değerli imza. Atatürk'ün imzası ve zarif portresiyle donatılmış, minimalist ve şık bir metal tablo.",
        category: "ATATURK_PLAKA",
        story: "Sadelikteki güç. Atatürk'ün imzasını metalin asaletine işledik.",
        specs: { material: "Fırçalı Alüminyum", process: "Lazer Hassasiyetinde UV", print: "Siyah Pigment", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Atatürk İmzalı Metal Tablo | Minimalist", description: "Atatürk imzası metal poster. Minimalist ve şık tasarım.", keywords: ["atatürk imzası", "minimalist tablo"] }
    },
    {
        id: "ATATURK_06",
        name: "Veral Torna & Teneke | Cephede Atatürk | Kahramanlık Destanı Metal Tablo | Sert Karakter",
        slug: "cephede-ataturk-kahramanlik-destani",
        price: 350,
        image: "/catalog/ataturk/ataturk_06.webp",
        description: "Cephedeki mağrur duruş. Kurtuluş Savaşı'nın lideri Atatürk'ün en güçlü karelerinden bir metal tablo.",
        category: "ATATURK_PLAKA",
        story: "Zafer yolu. Atatürk'ün askeri dehlasını ve cephedeki duruşunu yansıtan epik bir görsel.",
        specs: { material: "Dayanıklı Alüminyum", process: "Mat UV Baskı", print: "Yüksek Sabitleme", thickness: "1.5 MM", dims: "30x45cm", mounting: "Vida Delikli" },
        seo: { title: "Atatürk Cephe Fotoğrafı Metal Tablo", description: "Atatürk askeri fotoğraflı metal poster. Kurtuluş savaşı serisi.", keywords: ["atatürk cephede", "kahramanlık tablosu"] }
    },
    {
        id: "ATATURK_07",
        name: "Veral Torna & Teneke | Atatürk Kalpaklı | Milli Mücadele Ruhu Metal Tablo | Nostaljik",
        slug: "ataturk-kalpakli-milli-mücadele",
        price: 350,
        image: "/catalog/ataturk/ataturk_07.webp",
        description: "Kalpaklı Atatürk portresi. Milli mücadelenin ve bağımsızlık ruhunun en güçlü simgesi duvarlarınızda.",
        category: "ATATURK_PLAKA",
        story: "Bağımsızlık nişanesi. Atatürk'ün meşhur kalpaklı fotoğrafı, metalin soğuk ve güçlü dokusuyla birleşti.",
        specs: { material: "Premium Alüminyum", process: "Siyah-Beyaz UV", print: "Gümüş Detaylı", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Kalpaklı Atatürk Metal Tablo | Milli Mücadele", description: "Atatürk kalpaklı portre metal poster. Milli mücadele serisi.", keywords: ["kalpaklı atatürk", "milli mücadele"] }
    },

    // ===== KARAKTERLER (CHARACTERS) =====
    {
        id: "CHARACTERS_01",
        name: "Veral Torna & Teneke | Joker Pop Art | Kaotik Tasarım Metal Poster | Modern Sanat",
        slug: "joker-pop-art-kaotik-tasarim",
        price: 350,
        image: "/catalog/characters/characters_01.webp",
        description: "Kaosun gülüşü. Joker'in ikonik pop-art yorumu, canlı renkler ve endüstriyel alüminyum ile buluşuyor.",
        category: "CHARACTER_PLAKA",
        story: "Ciddi olmaya gerek var mı? Joker'in kaotik ruhunu modern bir sanat diline dönüştürdük.",
        specs: { material: "Canlı Yüzey Alüminyum", process: "Pop-Art UV Baskı", print: "Neon Efektli", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Joker Metal Tablo | Pop Art Tasarım", description: "Joker pop art metal poster. Modern duvar sanatı.", keywords: ["joker tablo", "pop art poster"] }
    },
    {
        id: "CHARACTERS_02",
        name: "Veral Torna & Teneke | Batman Dark Knight | Gece Yarısı Adaleti Metal Poster | Kahraman Serisi",
        slug: "batman-dark-knight-gece-yarisi",
        price: 350,
        image: "/catalog/characters/characters_02.webp",
        description: "Gölgelerin efendisi. Batman Dark Knight tasarımı, derin siyahlar ve metalik parlamalarla odanıza güç katacak.",
        category: "CHARACTER_PLAKA",
        story: "İhtiyacımız olan kahraman. Batman'in gizemli dünyasını yüksek kontrastlı baskı ile metal poster yaptık.",
        specs: { material: "Mat Siyah Alüminyum", process: "Yüksek Kontrast UV", print: "Derin Siyahlar", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Batman Metal Poster | Dark Knight Serisi", description: "Batman metal tablo. Süper kahraman koleksiyonu.", keywords: ["batman tablo", "dark knight poster"] }
    },
    {
        id: "CHARACTERS_08",
        name: "Veral Torna & Teneke | Godfather Don Corleone | Suç Dünyasının Lideri Metal Poster | İkonik Sinema",
        slug: "godfather-don-corleone-ikonik-sinema",
        price: 350,
        image: "/catalog/characters/characters_08.webp",
        description: "Reddedemeyeceğiniz bir teklif. Don Corleone'nin karizması, 1.5mm alüminyumun asaletiyle birleşti.",
        category: "CHARACTER_PLAKA",
        story: "Aile her şeydir. Sinema tarihinin en büyük başyapıtı Godfather, en ikonik karesiyle Veral'de.",
        specs: { material: "Premium Alüminyum", process: "Noir Stil UV Baskı", print: "Dinamik Gölge", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Godfather Metal Tablo | Don Corleone", description: "Godfather metal poster. Sinema klasiklerinden Don Corleone tablosu.", keywords: ["godfather tablo", "don corleone"] }
    },
    {
        id: "CHARACTERS_20",
        name: "Veral Torna & Teneke | Iron Man Stark Tech | Teknoloji Harikası Metal Poster | Marvel Serisi",
        slug: "iron-man-stark-tech-metal-poster",
        price: 350,
        image: "/catalog/characters/characters_20.webp",
        description: "Dahi, milyarder, hayırsever. Iron Man'in zırh teknolojisi ve kırmızı-altın parıltısı metalde hayat buluyor.",
        category: "CHARACTER_PLAKA",
        story: "Gelecek burada. Tony Stark'ın mühendislik dehasını yansıtan teknolojik bir Marvel eseri.",
        specs: { material: "Parlak Alüminyum", process: "Metalik Efektli UV", print: "Veral-Gen3 Neon", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Iron Man Metal Tablo | Marvel Yenilmezler", description: "Iron Man metal poster. Stark teknoloji temalı duvar sanatı.", keywords: ["iron man tablo", "marvel poster"] }
    },

    // ===== MOTOSİKLET SERİSİ (MOTORS) =====
    {
        id: "MOTORS_01",
        name: "Veral Torna & Teneke | Harley Davidson Fat Boy | Özgürlük Sesi Metal Poster | Motor Tutkusu",
        slug: "harley-davidson-fat-boy-metal-poster",
        price: 350,
        image: "/catalog/motors/motors_01.webp",
        description: "Kromun ve özgürlüğün efsanesi. Harley Davidson Fat Boy, tüm detaylarıyla dayanıklı metal üzerine işlendi.",
        category: "MOTOR_PLAKA",
        story: "Yolların gürültülü efendisi. Harley ruhunu evinizin duvarlarında hissetmek için tasarlandı.",
        specs: { material: "Paslanmaz Görünümlü Alüminyum", process: "Yüksek Detaylı UV", print: "Krom Efektli", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Harley Davidson Metal Tablo | Fat Boy Serisi", description: "Harley Davidson metal poster. Motosiklet tutkunları için garaj dekoru.", keywords: ["harley tablo", "motosiklet poster"] }
    },
    {
        id: "MOTORS_02",
        name: "Veral Torna & Teneke | Ducati Panigale V4 | İtalyan Hızı Metal Poster | Performans Sanatı",
        slug: "ducati-panigale-v4-italyan-hizi",
        price: 350,
        image: "/catalog/motors/motors_02.webp",
        description: "Pistlerin en hızlı İtalyanı. Ducati Panigale V4'ün agresif tasarımı ve kırmızısı metalde parlıyor.",
        category: "MOTOR_PLAKA",
        story: "Adrenalin ve zerafet. Ducati'nin yarışçı genlerini estetik bir metal sanata dönüştürdük.",
        specs: { material: "Hafif ve Güçlü Alüminyum", process: "Parlak UV Baskı", print: "Veral-Gen3 Red", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "Ducati Metal Poster | Yarış Motoru Tablosu", description: "Ducati Panigale metal poster. Modern ve dinamik motor sanatı.", keywords: ["ducati tablo", "yarış motoru"] }
    },
    {
        id: "MOTORS_22",
        name: "Veral Torna & Teneke | Cafe Racer Custom | Klasik Modifiye Metal Poster | Retro Motor Sanatı",
        slug: "cafe-racer-custom-retro-motor-sanati",
        price: 350,
        image: "/catalog/motors/motors_22.webp",
        description: "Kişiye özel tasarımın ruhu. Cafe Racer kültürü, minimalist bir kompozisyonla metal levhaya yansıdı.",
        category: "MOTOR_PLAKA",
        story: "Sadelik ve tarz. Klasik hatların modern modifiye anlayışıyla buluştuğu Cafe Racer serisi.",
        specs: { material: "Mat Bitiş Alüminyum", process: "Retro Stil UV", print: "Yüksek Kontrast", thickness: "1.5 MM", dims: "30x45cm", mounting: "Endüstriyel Bant" },
        seo: { title: "Cafe Racer Metal Tablo | Retro Motor Kültürü", description: "Cafe Racer custom metal poster. Retro motor tutkunları için özel tasarım.", keywords: ["cafe racer tablo", "retro motor"] }
    },

    // ===== ŞEHİR VE KENT (CITY) =====
    {
        id: "CITY_01",
        name: "Veral Torna & Teneke | İstanbul Boğazı | Panoramik Şehir Metal Tablo | Kent Hafızası",
        slug: "istanbul-bogazi-panoramik-sehir-tablo",
        price: 350,
        image: "/catalog/city/city_01.webp",
        description: "İki kıtanın buluştuğu nokta. İstanbul Boğazı'nın ikonik görünümü, fırçalanmış alüminyum üzerinde derinlik kazanıyor.",
        category: "CITY_PLAKA",
        story: "Dünyanın en güzel şehri. İstanbul'un tarihini ve enerjisini endüstriyel bir dille mekanlarınıza taşıyoruz.",
        specs: { material: "6061 Alüminyum", process: "Geniş Açı UV Baskı", print: "Arşivsel Mavi/Siyah", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "İstanbul Metal Tablo | Şehir Posterleri", description: "İstanbul panoramik metal poster. Şehir ve kent temalı duvar sanatı.", keywords: ["istanbul tablo", "şehir posteri"] }
    },
    {
        id: "CITY_02",
        name: "Veral Torna & Teneke | New York City Skyline | Modern Metropol Metal Tablo | Ofis Sanatı",
        slug: "new-york-city-skyline-modern-metropol",
        price: 350,
        image: "/catalog/city/city_02.webp",
        description: "Gökdelenlerin şehri. New York'un gece ışıkları ve modern silüeti metalin soğuk parıltısıyla mükemmel uyum içinde.",
        category: "CITY_PLAKA",
        story: "Uyumayan şehir. Modern dünya metropollerinin enerjisini ofisinize veya evinize taşıyın.",
        specs: { material: "Hafif Kompozit Alüminyum", process: "Işıklı Gece UV Baskısı", print: "Neon Efektli", thickness: "1.5 MM", dims: "30x45cm", mounting: "Gizli Askı" },
        seo: { title: "NYC Metal Poster | New York Şehir Silüeti", description: "New York City skyline metal poster. Modern metropol tasarımı.", keywords: ["new york tablo", "skyline poster"] }
    }
];
