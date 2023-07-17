const progressText = document.querySelector('#progressText')
const progressBar = document.querySelector('.progress_full')
const quetionEl = document.querySelector('#question')
const choices = document.querySelectorAll('#choice')
const scoreText = document.getElementById('score')
const btnsEl = document.querySelector('.btns')
const scoreBox = document.querySelector('.scoreBox')
const gameBox = document.querySelector('.gameBox')
const resultScore = document.querySelector('.resultScore')

let currentQuestion = {}
let acceptQuetion = true
let score = 0
let questionCounter = 0
let acceptingAnswers
scoreBox.style.display = "none"
let questions = [
    {
        quetion: 'Сколько будет 2 + 2?',
        choice1: '1',
        choice2: '2',
        choice3: '4',
        choice4: '22',
        answer: 3
    },
    {
        quetion: 'Столица Британии?',
        choice1: 'Москва',
        choice2: 'Лондон',
        choice3: 'Париж',
        choice4: 'Гамбург',
        answer: 2
    },
    {
        quetion: 'Самая длинная река в мире?',
        choice1: 'Нил',
        choice2: 'Амазонка',
        choice3: 'Конго',
        choice4: 'Парана',
        answer: 1
    },
    {
        quetion: 'Самая высокая постройка в мире?',
        choice1: 'Шанхайская башня',
        choice2: 'Чайна-Цзунь',
        choice3: 'Финансовый центр CTF',
        choice4: 'Бурдж-Халифа',
        answer: 4
    },
]

let avalibleQuetion = [...questions]

const scorePoints = 100
const maxQuestions = 4

startGame = () => getNewQuestion()


function getNewQuestion() {

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressBar.style.width = `${(questionCounter / maxQuestions) * 100}%`

    questionsIndex = Math.floor(Math.random() * avalibleQuetion.length)
    currentQuestion = avalibleQuetion[questionsIndex]
    quetionEl.innerText = currentQuestion.quetion

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    avalibleQuetion.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const seletedAnswer = selectedChoice.dataset['number']

        let classToApply = seletedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            if (questionCounter === maxQuestions) {
                if (localStorage.getItem('Score'))
                    localStorage.length === 1 ?
                        localStorage.getItem(`Score${1}`, localStorage.getItem(`Score`))
                        : localStorage.setItem(`Score${localStorage.length}`, localStorage.getItem(`Score`))
                localStorage.setItem('Score', scoreText.innerText)
                setTimeout(() => {
                    scoreBox.style.opacity = 1
                    gameBox.style.opacity = 0;
                }, 500)
                scoreBox.style.display = "flex"
                gameBox.style.display = "none"
                resultScore.innerText = `Ваш счет: ${scoreText.innerText}`
                console.log("Игра закончена")
            } else {
                getNewQuestion()
            }
        }, 1000)

    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
