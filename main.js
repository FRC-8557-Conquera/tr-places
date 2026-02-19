const map = L.map("map", {
    maxBounds: [[33, 24], [44, 47]],
    maxBoundsViscosity: 1.0,
    minZoom: 4,
    maxZoom: 15,
}).setView([38.70265930723801, 33.486328125], 4)

map.attributionControl.setPrefix(false)

const modalContainer = document.querySelector(".modal-container")

const placeData = await (await fetch("place_data.json")).json()
const POINTS = placeData["coordinates"]
const INFO = placeData["info"]

const questions = await(await fetch("questions.json")).json()

let currentQuestions = []
let currentQuestionIndex = 0
let score = 0

function clearQuestionChoices(makeVisible) {
    const d = makeVisible ? "block" : "none"
    document.querySelectorAll(".choice").forEach(x => x.style.display = d)
    document.querySelector("#sendButton").style.display = d
}

function showQuestion() {
    const q = currentQuestions[currentQuestionIndex]

    document.querySelector("#question-text").innerText =
        `Soru ${currentQuestionIndex + 1}/5: ${q.text}`

    document.querySelector("#choiceALabel").innerText = q.choices[0]
    document.querySelector("#choiceBLabel").innerText = q.choices[1]
    document.querySelector("#choiceCLabel").innerText = q.choices[2]
    document.querySelector("#choiceDLabel").innerText = q.choices[3]

    document.querySelectorAll("input[name='choice']").forEach(x => x.checked = false)
}

Object.entries(POINTS).forEach(([pointID, pointCoords]) => {
    const marker = L.marker(pointCoords).addTo(map)

    marker.on("click", () => {

        const info = INFO[pointID]

        modalContainer.querySelector(".modal-item-title").innerText = info.title
        const modalImage = modalContainer.querySelector(".modal-image")
        modalImage.src = ""
        const imageAttribution = modalContainer.querySelector(".modal-image-attribution")
        imageAttribution.href = ""
        imageAttribution.innerText = ""

        if (info.imageURL) {
            modalImage.src = info.imageURL
            imageAttribution.innerText = info.imageAttr
            imageAttribution.href = info.imageAttrURL || ""
        }

        const bulletsContainer = modalContainer.querySelector(".points")
        bulletsContainer.innerHTML = ""
        info.detailBullets.forEach(bullet => {
            const li = document.createElement("li")
            li.innerText = bullet
            bulletsContainer.appendChild(li)
        })

        document.querySelector("#question-feedback").innerText = ""
        document.querySelector("#question-text").innerText = ""

        clearQuestionChoices(false)

        if(questions[pointID]) {
            currentQuestions = [...questions[pointID]]
                .sort(() => Math.random() - 0.5)
                .slice(0, 5)

            currentQuestionIndex = 0
            score = 0

            clearQuestionChoices(true)
            showQuestion()
        }

        modalContainer.classList.add("visible")
    })
})

document.querySelector("#sendButton").onclick = e => {
    e.preventDefault()

    const choices = [...document.querySelectorAll("input[name='choice']")]
    const selected = choices.findIndex(c => c.checked)

    if (selected === -1) return

    const qfb = document.querySelector("#question-feedback")
    const correct = currentQuestions[currentQuestionIndex].correct_answer_idx

    if (selected === correct) {
        qfb.innerText = "Doğru!"
        score++
    } else {
        qfb.innerText = `Yanlış! Doğru cevap: ${currentQuestions[currentQuestionIndex].choices[correct]}`
    }

    setTimeout(() => {
        currentQuestionIndex++

        if (currentQuestionIndex < 5) {
            qfb.innerText = ""
            showQuestion()
        } else {
            document.querySelector("#question-text").innerText =
                `Puanınız: ${score} / 5`
            clearQuestionChoices(false)
            qfb.innerText = ""
        }
    }, 800)
}

const closeModal = () => modalContainer.classList.remove("visible")

modalContainer.querySelector(".modal-close-button").addEventListener("click", closeModal)
modalContainer.querySelector(".modal-scrim").addEventListener("click", closeModal)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
