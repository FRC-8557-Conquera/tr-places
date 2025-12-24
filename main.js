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
        detailBullets: [
            "Yaklaşık 3.000 - 4.500 yıllık",
            "Homeros’un İlyada Destanı’nda bulunan Truva Savaşı’nın geçtiği yer olarak bilinir. 9 farklı uygarlık ait izler barındırır. UNESCO Dünya Mirası listesindedir."
        ]
    },
    "iznik": {
        title: "İznik Antik Kenti - Bursa",
        detailBullets: [
            "Yaklaşık 2.300 yıllık",
            "Roma, Bizans ve Osmanlı dönemlerindeki önemli bir merkezdir. Birinci Konsil’in toplandığı yer olmasından Hristiyanlık tarihinde önemli bir yere sahiptir."
        ]
    },
    "efes": {
        title: "Efes Antik Kenti - İzmir",
        detailBullets: [
            "Yaklaşık 2.500 yıllık",
            "Artemis, Celsus Kütüphanesi ve antik tiyatrosuyla ünlüdür. Roma döneminin en büyük liman kentlerinden biridir."
        ]
    },
    "bergama": {
        title: "Bergama (Pergamon) - İzmir",
        detailBullets: [
            "Yaklaşık 2.200 yıllık",
            "Dünyanın ilk büyük kütüphanelerinden biri burada kurulmuştur. 2014 yılında UNESCO Dünya Mirası listesine girmiştir."
        ]
    },
    "aspendos": {
        title: "Aspendos - Antalya",
        detailBullets: [
            "Yaklaşık 1.800 yıllık",
            "Dünyanın en iyi korunmuş antik tiyatrolarından birine ev sahipliği yapar. MÖ 10. yüzyılda Akalar tarafından kurulmuştur"
        ]
    },
    "perge": {
        title: "Perge Antik Kenti - Antalya",
        detailBullets: [
            "Yaklaşık 2.000 yıllık",
            "Helenistik ve Roma dönemlerinin düzenli kentlerinden biridir. Sütunlu caddeleri, hamamları ve stadyumuyla ünlüdür."
        ]
    },
    "cthyk": {
        title: "Çatalhöyük - Konya",
        detailBullets: [
            "Yaklaşık 9.000 yıllık",
            "Bilinen en eski yerleşimlerinden biridir. 1950’lı yıllarda keşfedilmiş ve UNESCO Dünya Mirası listesine 2012’de girmiştir."
        ]
    },
    "htssa": {
        title: "Hattuşa - Çorum",
        detailBullets: [
            "Yaklaşık 3.500 yıllık",
            "Hitit İmparatorluğu’nun başkentidir. Aslanlı Kapı, Kral Kapısı ve Yazılıkaya açık hava tapınağı ile ünlüdür."
        ]
    },
    "sfr": {
        title: "Safranbolu Kaya Mezarları - Karabük",
        detailBullets: [
            "Yaklaşık 2.500 yıllık",
            "Paphlagonia döneminden kalma Safranbolu çevresindeki dik yamaçlara oyulmuş kaya mezarlarıdır."
        ]
    },
    "kkma": {
        title: "Kral Kaya Mezarları - Amasya",
        detailBullets: [
            "Yaklaşık 2.300 yıllık",
            "Pontus Krallığının krallarına için kayalara oyulmuş anıtsal mezarlardır. Şehrin bir simgesi haline gelmiştir."
        ]
    },
    "nmrt": {
        title: "Nemrut Dağı - Adıyaman",
        detailBullets: [
            "Yaklaşık 2.000 yıllık",
            "Kommagene Krallığı’na ait anıtsal heykeller bulunur. Güneş doğuşu ve batışında görülen manzarasıyla dünyaca ünlüdür."
        ]
    },
    "anih": {
        title: "Ani Harabeleri - Kars",
        detailBullets: [
            "Yaklaşık 1.000 - 1.500 yıllık",
            "1001 Kilise Şehri olarak bilinir. Orta Çağ’da önemli bir ticaret ve kültür merkezidir."
        ]
    },
    "gbklt": {
        title: "Göbeklitepe - Şanlıurfa",
        detailBullets: [
            "11.000 - 12.000 yıllık",
            "Bilinen en eski tapınaktır. Din, yerleşik hayat ve medeniyet tarihiyle ilgili yeni bilgiler bulunmasını sağlamıştır. T şeklindeki sütunları ve kabartmalarıyla ünlüdür."
        ]
    },
    "zgma": {
        title: "Zeugma - Gaziantep",
        detailBullets: [
            "Yaklaşık 2.000 yıllık",
            "Roma dönemine ait mozaikleriyle ünlüdür. Çingene Kızı Mozaiği, oradaki en bilinen eserlerden biridir."
        ]
    }
}

Object.entries(POINTS).forEach(([pointID, pointCoords]) => {
    const marker = L.marker(pointCoords).addTo(map)

    const info = INFO[pointID]

    marker.on("click", () => {
        modalContainer.querySelector(".modal-item-title").innerText = info.title
        const bulletsContainer = modalContainer.querySelector(".points")
        bulletsContainer.innerHTML = ""
        info.detailBullets.forEach(bullet => {
            const li = document.createElement("li")
            li.innerText = bullet
            bulletsContainer.appendChild(li)
        })

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