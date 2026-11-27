export type TornaFaq = { question: string; answer: string };

export type TornaService = {
    slug: string;
    title: string;
    text: string;
    intro: string;
    uses: string[];
    steps: string[];
    faqs: TornaFaq[];
    related: string[];
};

const WORKSHOP =
    "Veral Torna ve Teneke Ticaret, 1986'dan beri İzmir Alsancak'ta seri üretim yapan bir atölyedir. Seri tekrar ve tek parça aynı atölyede ele alınır. Fiyat, süre ve ölçü bu sayfada yazılmaz; fiyat, bilgi veya numune sonrası ayrıca bildirilir.";

export const TORNA_SERVICES: TornaService[] = [
    {
        slug: "yedek-parca",
        title: "Yedek parça imalatı",
        text: "Tornada yedek parça imalatı.",
        intro: `${WORKSHOP} Yedek parça imalatı, makinede eksilen veya bozulan parçanın tornada yeniden yapılmasıdır. Mil, burç, pul, pim ve benzeri dönen parçalar bu işin içine girer. Parça, verilen ölçüye veya getirilen numuneye göre işlenir. Seri tekrar da, tek parça da aynı atölyede ele alınır.`,
        uses: [
            "Makinede aşınan veya kırılan mil",
            "Eksilen burç, pul ve pim",
            "Numunesi duran küçük metal parça",
            "Aynı parçadan yeniden üretim",
        ],
        steps: [
            "Parça bilgisi, ölçü veya numune iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "Parça tornada imal edilir.",
            "Teslim Alsancak atölyesinden yapılır.",
        ],
        faqs: [
            {
                question: "Numune olmadan yedek parça imalatı olur mu?",
                answer: "Ölçü bilgisi de yeterlidir. Numune varsa ölçü onun üzerinden alınır.",
            },
            {
                question: "Hangi parçalar girer?",
                answer: "Tornada işlenebilen mil, burç, pul, pim ve benzeri yedek parçalar girer.",
            },
            {
                question: "Fiyat nerede yazılır?",
                answer: "Fiyat, ölçü veya numune görüldükten sonra ayrıca yazılır.",
            },
        ],
        related: ["imalat", "tamir"],
    },
    {
        slug: "tamir",
        title: "Tamir",
        text: "Metal parça tamiri.",
        intro: `${WORKSHOP} Tamir, bozulan metal parçanın yeniden kullanılabilir hale getirilmesidir. Kırık, aşınmış veya dişleri bozulmuş parçalar atölyeye getirilir. İş, parçanın durumuna göre düzeltme, diş yenileme veya eksik bölümün işlenmesi olabilir. Yeni parça imalatı ayrı bir iştir; tamirde mevcut parça ele alınır.`,
        uses: [
            "Dişi bozulan bağlantı",
            "Aşınan mil ve burç yuvası",
            "Eğilen veya çarpan küçük metal parça",
            "Sökülüp yeniden takılması gereken parça",
        ],
        steps: [
            "Parça ve arıza bilgisi iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "Tamir atölyede yapılır.",
            "Parça teslim edilir.",
        ],
        faqs: [
            {
                question: "Her parça tamir edilir mi?",
                answer: "Parça görüldükten sonra tamire uygun olup olmadığı söylenir. Uygun değilse imalat yolu ayrıca konuşulur.",
            },
            {
                question: "Tamir ile imalat aynı iş midir?",
                answer: "Hayır. Tamirde mevcut parça düzeltilir. İmalatta parça yeniden yapılır.",
            },
            {
                question: "Diş bozulmasında ne yapılır?",
                answer: "Heli-Coil ve baga uygulamaları bu iş için ayrı bir başlıkta ele alınır.",
            },
        ],
        related: ["heli-coil-ve-baga", "yedek-parca", "makine-bakim-ve-onarimi"],
    },
    {
        slug: "imalat",
        title: "İmalat",
        text: "Tornada parça imalatı.",
        intro: `${WORKSHOP} İmalat, istenen parçanın tornada sıfırdan yapılmasıdır. Eldeki teknik resim, yazılı ölçü veya numune başlangıç bilgisidir. Tek parça deneme de, aynı parçadan seri üretim de bu başlığın içindedir. Yedek parça imalatı, makinede eksilen parçaya yönelik olanıdır. Buradaki imalat daha genel bir tornacılık işidir.`,
        uses: [
            "Ölçüsü belli yeni parça",
            "Numuneden kopya parça",
            "Seri tekrar isteyen küçük parça",
            "Kalıba girecek torna parçası",
        ],
        steps: [
            "Ölçü, resim veya numune iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "İmalat tornada yapılır.",
            "Teslim Alsancak atölyesinden yapılır.",
        ],
        faqs: [
            {
                question: "Tek parça imalat olur mu?",
                answer: "Evet. Tek parça da, seri tekrar da alınır. Adet fiyat yazılırken belirtilir.",
            },
            {
                question: "Resim şart mıdır?",
                answer: "Şart değildir. Ölçü yazısı veya numune de başlangıç için yeterlidir.",
            },
            {
                question: "Seri üretim nerede yapılır?",
                answer: "Seri üretim, İzmir Alsancak'taki aynı atölyede yapılır.",
            },
        ],
        related: ["yedek-parca", "kalip-imalati"],
    },
    {
        slug: "kalip-imalati",
        title: "Kalıp imalatı",
        text: "Kalıp imalatı.",
        intro: `${WORKSHOP} Kalıp imalatı, bir parçanın tekrar üretilebilmesi için kalıbın tornada ve atölyede hazırlanmasıdır. Kalıp, verilen parça ölçüsüne veya numuneye göre düşünülür. İşin kapsamı, kalıbın hangi parçayı basacağı veya şekillendireceği bilinince netleşir. Kalıp imalatı, parça imalatından ayrı bir başlıktır.`,
        uses: [
            "Tekrar basılacak sac veya teneke parça",
            "Numunesi olan şekil için kalıp",
            "Mevcut kalıbın yenilenmesi",
            "Küçük seri için basit kalıp",
        ],
        steps: [
            "Parça bilgisi, ölçü veya numune iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "Kalıp imal edilir.",
            "Teslim Alsancak atölyesinden yapılır.",
        ],
        faqs: [
            {
                question: "Kalıp ile parça imalatı aynı mıdır?",
                answer: "Hayır. Kalıp, parçanın tekrar üretileceği araçtır. Parçanın kendisi ayrı imal edilir.",
            },
            {
                question: "Eski kalıp yenilenir mi?",
                answer: "Kalıp atölyeye geldiğinde yenilemeye uygun olup olmadığına bakılır.",
            },
            {
                question: "Ne ile başlanır?",
                answer: "Parça ölçüsü veya numune ile başlanır. Fiyat ondan sonra yazılır.",
            },
        ],
        related: ["imalat", "yedek-parca"],
    },
    {
        slug: "makine-bakim-ve-onarimi",
        title: "Makine bakım ve onarımı",
        text: "Makine bakım ve onarımı.",
        intro: `${WORKSHOP} Makine bakım ve onarımı, çalışan tezgahın düzenli bakımı ve arıza halinde onarımıdır. Gevşeyen bağlantı, aşınan parça ve duran hareket bu işin konusudur. Eksik parça varsa yedek parça imalatı ayrıca ele alınır. Rulman ve burç takılması da ayrı bir başlıktadır. Bakımda amaç, makinenin işine devam edebilmesidir.`,
        uses: [
            "Düzenli tezgah bakımı",
            "Ses yapan veya zor dönen mil",
            "Gevşeyen veya boşalan bağlantı",
            "Arıza sonrası onarım",
        ],
        steps: [
            "Makine bilgisi ve arıza notu iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "Bakım veya onarım yapılır.",
            "Makine teslim edilir veya iş yerinde bırakılır.",
        ],
        faqs: [
            {
                question: "Bakım ile onarım aynı mıdır?",
                answer: "Bakım, çalışır durumdaki makinenin gözden geçirilmesidir. Onarım, arıza sonrası düzeltmedir.",
            },
            {
                question: "Parça değişirse ne olur?",
                answer: "Eksik parça, yedek parça imalatı başlığında ayrıca ele alınır.",
            },
            {
                question: "Rulman takılması burada mıdır?",
                answer: "Rulman ve burç çakma, hidrolik pres başlığında ayrıca yazılır.",
            },
        ],
        related: ["tamir", "rulman-ve-burc-cakma", "yedek-parca"],
    },
    {
        slug: "heli-coil-ve-baga",
        title: "Heli-Coil ve baga uygulamaları",
        text: "Heli-Coil ve baga uygulamaları.",
        intro: `${WORKSHOP} Heli-Coil ve baga uygulamaları, hasarlı vida dişinin yenilenmesi işidir. Heli-Coil, vida dişine takılan bir tel burçtur. Bozulan diş temizlenir, yuva hazırlanır ve tel burç yerine oturtulur. Böylece aynı vida ölçüsü yeniden kullanılabilir. Baga, atölyenin kendi kullandığı addır. Ayrı bir marka veya ayrı bir ölçü iddiası olarak yazılmaz. İş, getirilen parçanın dişine bakılarak yapılır.`,
        uses: [
            "Yalama olmuş vida dişi",
            "Sökülüp takıla takıla bozulan bağlantı",
            "Yumuşak metaldeki zayıf diş",
            "Aynı vida ölçüsünün korunması",
        ],
        steps: [
            "Parça ve vida bilgisi iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "Heli-Coil veya baga uygulaması yapılır.",
            "Parça teslim edilir.",
        ],
        faqs: [
            {
                question: "Heli-Coil nedir?",
                answer: "Heli-Coil, hasarlı vida dişini yenilemek için takılan bir tel burçtur.",
            },
            {
                question: "Baga nedir?",
                answer: "Baga, atölyenin bu iş için kullandığı addır. Ayrı bir ölçü veya marka olarak yazılmaz.",
            },
            {
                question: "Her diş yenilenir mi?",
                answer: "Parça görüldükten sonra dişin yenilenmeye uygun olup olmadığı söylenir.",
            },
        ],
        related: ["tamir", "makine-bakim-ve-onarimi"],
    },
    {
        slug: "motosiklet-jant-tamiri",
        title: "Motosiklet jant tamiri",
        text: "Motosiklet jant tamiri.",
        intro: `${WORKSHOP} Motosiklet jant tamiri, çarpan, eğilen veya bağlantısı bozulan jantın atölyede ele alınmasıdır. Jant getirilir, neresinin bozuk olduğu bakılır. İş, düzeltme veya ilgili metal bölümün tamiri olabilir. Her jantın kurtarılacağı önceden söylenmez. Uygun değilse bu, jant görüldükten sonra belirtilir. İş, İzmir Alsancak'taki atölyede yapılır.`,
        uses: [
            "Çarpma sonrası eğilen jant",
            "Göbeği veya bağlantısı bozulan jant",
            "Metal bölümü tamir isteyen jant",
            "Tekrar kullanılmak istenen jant",
        ],
        steps: [
            "Jant ve hasar bilgisi iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "Tamir uygunsa yapılır.",
            "Jant teslim edilir.",
        ],
        faqs: [
            {
                question: "Her jant tamir edilir mi?",
                answer: "Hayır. Jant görüldükten sonra tamire uygun olup olmadığı söylenir.",
            },
            {
                question: "Jant nerede bırakılır?",
                answer: "Jant, Alsancak atölyesine getirilir. Adres 1471 Sokak No:12/A.",
            },
            {
                question: "Fiyat önceden belli midir?",
                answer: "Hayır. Fiyat, jant görüldükten sonra yazılır.",
            },
        ],
        related: ["tamir"],
    },
    {
        slug: "rulman-ve-burc-cakma",
        title: "Hidrolik pres ile rulman ve burç çakma",
        text: "Hidrolik pres ile rulman ve burç çakma.",
        intro: `${WORKSHOP} Hidrolik pres ile rulman ve burç çakma, rulman veya burcun yuvasına presle oturtulmasıdır. Parça ve yuva atölyeye gelir. Rulman veya burç, yuvasına zarar vermeden yerine takılır. Bu iş, makine bakımının içinde geçen bir adımdır. Yuvası bozulmuşsa tamir veya yedek parça imalatı ayrıca bakılır. Presin markası veya gücü bu sayfada yazılmaz.`,
        uses: [
            "Mile takılacak rulman",
            "Yuvasına girecek burç",
            "Bakım sırasında değişen rulman",
            "Sökülüp yeniden çakılacak burç",
        ],
        steps: [
            "Parça, rulman veya burç bilgisi iletilir.",
            "Fiyat bilgisi ayrıca yazılır.",
            "Çakma hidrolik pres ile yapılır.",
            "Parça teslim edilir.",
        ],
        faqs: [
            {
                question: "Rulman atölyede mi temin edilir?",
                answer: "Rulman getirilebilir. Atölyede bulunup bulunmayacağı, parça görülünce belli olur.",
            },
            {
                question: "Burç ile rulman aynı iş midir?",
                answer: "İkisi de yuvaya presle oturtulur. Parçanın adı iş başlarken netleştirilir.",
            },
            {
                question: "Yuva bozuksa ne olur?",
                answer: "Yuva tamire veya yeni parça imalatına uygunsa o iş ayrıca ele alınır.",
            },
        ],
        related: ["makine-bakim-ve-onarimi", "tamir", "yedek-parca"],
    },
];

export function tornaHref(slug: string): string {
    return `/hizmetler/torna/${slug}`;
}

export function findTornaService(slug: string): TornaService | undefined {
    return TORNA_SERVICES.find((item) => item.slug === slug);
}
