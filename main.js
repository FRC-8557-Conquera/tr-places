const map = L.map("map", {
    maxBounds: [[33, 24], [44, 47]],
    maxBoundsViscosity: 1.0,
    minZoom: 4,
    maxZoom: 10,
}).setView([38.70265930723801,33.486328125], 4)
map.attributionControl.setPrefix(false)

const modalContainer = document.querySelector(".modal-container")

const POINTS = {
    "troy": [40.1520655,26.4028835],
    "iznik": [40.4366259,29.717979],
    "efes": [37.9409307,27.3413291],
    "bergama": [39.1138235,27.1539399],
    "aspendos": [36.938971,31.1704719],
    "perge": [36.9663967,30.8528187],
    "cthyk": [37.7670645,32.5263054],
    "htssa": [40.0286428,34.6188364],
    "sfr": [41.2573975,32.6401035],
    "kkma": [40.6536213,35.8284518],
    "nmrt": [37.9806789,38.7397522],
    "anih": [40.5110228,43.5702431],
    "gbklt": [37.2232546,38.9196216],
    "zgma": [37.0579753,37.8683058]
}

const INFO = {
    "troy": {
        title: "Troya (Truva) - Çanakkale",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Truva_At%C4%B1_-_Trojan_Horse_-_panoramio.jpg",
        imageAttr: "(c) Tevfik Teker, CC BY 3.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 3.000 - 4.500 yıllık",
            "Homeros’un İlyada Destanı’nda bulunan Truva Savaşı’nın geçtiği yer olarak bilinir. 9 farklı uygarlık ait izler barındırır. UNESCO Dünya Mirası listesindedir."
        ]
    },
    "iznik": {
        title: "İznik Antik Kenti - Bursa",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Iznik_Wall_at_Lefke_Gate_8253.jpg/500px-Iznik_Wall_at_Lefke_Gate_8253.jpg",
        imageAttr: "(c) Dosseman, CC BY-SA 4.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.300 yıllık",
            "Roma, Bizans ve Osmanlı dönemlerindeki önemli bir merkezdir. Birinci Konsil’in toplandığı yer olmasından Hristiyanlık tarihinde önemli bir yere sahiptir."
        ]
    },
    "efes": {
        title: "Efes Antik Kenti - İzmir",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Library_of_Celsus_side_view.jpg",
        imageAttr: "(c) Peter K Burian, CC BY-SA 4.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.500 yıllık",
            "Artemis, Celsus Kütüphanesi ve antik tiyatrosuyla ünlüdür. Roma döneminin en büyük liman kentlerinden biridir."
        ]
    },
    "bergama": {
        title: "Bergama (Pergamon) - İzmir",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bergama%2C_Turkey.jpg/2560px-Bergama%2C_Turkey.jpg",
        imageAttr: "(c) Bernard Gagnon, CC BY-SA 3.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.200 yıllık",
            "Dünyanın ilk büyük kütüphanelerinden biri burada kurulmuştur. 2014 yılında UNESCO Dünya Mirası listesine girmiştir."
        ]
    },
    "aspendos": {
        title: "Aspendos - Antalya",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aspendos_Amphitheatre.jpg/2560px-Aspendos_Amphitheatre.jpg",
        imageAttr: "(c) Saffron Blaze, CC BY-SA 3.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 1.800 yıllık",
            "Dünyanın en iyi korunmuş antik tiyatrolarından birine ev sahipliği yapar. MÖ 10. yüzyılda Akalar tarafından kurulmuştur"
        ]
    },
    "perge": {
        title: "Perge Antik Kenti - Antalya",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Perge_city_overview.jpg/2560px-Perge_city_overview.jpg",
        imageAttr: "(c) Saffron Blaze, CC BY-SA 3.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.000 yıllık",
            "Helenistik ve Roma dönemlerinin düzenli kentlerinden biridir. Sütunlu caddeleri, hamamları ve stadyumuyla ünlüdür."
        ]
    },
    "cthyk": {
        title: "Çatalhöyük - Konya",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CatalHoyukSouthArea.JPG/960px-CatalHoyukSouthArea.JPG",
        imageAttr: "(c) User:Ziggurat, CC-BY-SA 3.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 9.000 yıllık",
            "Bilinen en eski yerleşimlerinden biridir. 1950’lı yıllarda keşfedilmiş ve UNESCO Dünya Mirası listesine 2012’de girmiştir."
        ]
    },
    "htssa": {
        title: "Hattuşa - Çorum",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Lion_Gate%2C_Hattusa_01.jpg/2560px-Lion_Gate%2C_Hattusa_01.jpg",
        imageAttr: "(c) Bernard Gagnon, CC BY-SA 3.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 3.500 yıllık",
            "Hitit İmparatorluğu’nun başkentidir. Aslanlı Kapı, Kral Kapısı ve Yazılıkaya açık hava tapınağı ile ünlüdür."
        ]
    },
    "sfr": {
        title: "Safranbolu Kaya Mezarları - Karabük",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/0/08/Safranbolu_traditional_houses.jpg",
        imageAttr: "(c) Uğur Başak, CC BY-SA 3.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.500 yıllık",
            "Paphlagonia döneminden kalma Safranbolu çevresindeki dik yamaçlara oyulmuş kaya mezarlarıdır."
        ]
    },
    "kkma": {
        title: "Kral Kaya Mezarları - Amasya",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/0/01/Amasya%27daki_tarihi_evler_ve_Kral_Kaya_Mezarlar%C4%B1.jpg",
        imageAttr: "(c) TUSLOG Detachment 3-2, Kamu malı, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.300 yıllık",
            "Pontus Krallığının krallarına için kayalara oyulmuş anıtsal mezarlardır. Şehrin bir simgesi haline gelmiştir."
        ]
    },
    "nmrt": {
        title: "Nemrut Dağı - Adıyaman",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mount_Nemrut_-_East_Terrace_%284961323529%29.jpg/2560px-Mount_Nemrut_-_East_Terrace_%284961323529%29.jpg",
        imageAttr: "(c) Klearchos Kapoutsis (Santorini, Yunanistan), CC BY 2.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.000 yıllık",
            "Kommagene Krallığı’na ait anıtsal heykeller bulunur. Güneş doğuşu ve batışında görülen manzarasıyla dünyaca ünlüdür."
        ]
    },
    "anih": {
        title: "Ani Harabeleri - Kars",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Ani_Harabeleri_2.jpg/2560px-Ani_Harabeleri_2.jpg",
        imageAttr: "(c) Engin Tavlı, CC BY-SA 4.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 1.000 - 1.500 yıllık",
            "1001 Kilise Şehri olarak bilinir. Orta Çağ’da önemli bir ticaret ve kültür merkezidir."
        ]
    },
    "gbklt": {
        title: "Göbeklitepe - Şanlıurfa",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Gobeklitepe_Panorama.jpg/2560px-Gobeklitepe_Panorama.jpg",
        imageAttr: "(c) Spica-Vega Photo Arts (Banu Nazikcan), CC BY-SA 4.0, Wikimedia Commons",
        detailBullets: [
            "11.000 - 12.000 yıllık",
            "Bilinen en eski tapınaktır. Din, yerleşik hayat ve medeniyet tarihiyle ilgili yeni bilgiler bulunmasını sağlamıştır. T şeklindeki sütunları ve kabartmalarıyla ünlüdür."
        ]
    },
    "zgma": {
        title: "Zeugma - Gaziantep",
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Zeugma_dec_2008_7378.jpg",
        imageAttr: "(c) Dosseman, CC BY-SA 4.0, Wikimedia Commons",
        detailBullets: [
            "Yaklaşık 2.000 yıllık",
            "Roma dönemine ait mozaikleriyle ünlüdür. Çingene Kızı Mozaiği, oradaki en bilinen eserlerden biridir."
        ]
    }
}

const questions = await (await fetch("/questions.json")).json()

Object.entries(POINTS).forEach(([pointID, pointCoords]) => {
    const marker = L.marker(pointCoords).addTo(map)

    const info = INFO[pointID]

    marker.on("click", () => {
        modalContainer.querySelector(".modal-item-title").innerText = info.title

        const modalImage = modalContainer.querySelector(".modal-image")
        modalImage.src = "" // reset first
        const imageAttribution = modalContainer.querySelector(".modal-image-attribution")
        imageAttribution.innerText = ""

        if(info.imageURL) {
            modalImage.src = info.imageURL
            imageAttribution.innerText = info.imageAttr
        }

        const bulletsContainer = modalContainer.querySelector(".points")
        bulletsContainer.innerHTML = ""
        info.detailBullets.forEach(bullet => {
            const li = document.createElement("li")
            li.innerText = bullet
            bulletsContainer.appendChild(li)
        })

        const qfb = document.querySelector("#question-feedback")
        qfb.innerText = ""

        const choiceElems = ["#choiceA", "#choiceB", "#choiceC", "#choiceD"].map(x=>document.querySelector(x))
        choiceElems.forEach(x=>x.checked = false)

        const randomQuestion = questions[pointID][Math.floor(Math.random() * questions[pointID].length)]
        document.querySelector("#question-text").innerText = randomQuestion.text
        document.querySelector("#choiceALabel").innerText = randomQuestion.choices[0]
        document.querySelector("#choiceBLabel").innerText = randomQuestion.choices[1]
        document.querySelector("#choiceCLabel").innerText = randomQuestion.choices[2]
        document.querySelector("#choiceDLabel").innerText = randomQuestion.choices[3]
        const sb = document.querySelector("#sendButton")
        sb.onclick = e => {
            e.preventDefault()
            const selected = choiceElems.findIndex(x=>x.checked)
            if(selected == -1) return

            qfb.innerText = selected == randomQuestion.correct_answer_idx ? "Doğru!" : "Yanlış!"
        }

        modalContainer.classList.add("visible")
    })
})

const closeModal = () => {
    modalContainer.classList.remove("visible")
}

modalContainer.querySelector(".modal-close-button").addEventListener("click", closeModal)
modalContainer.querySelector(".modal-scrim").addEventListener("click", closeModal)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)