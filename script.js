const startBtn = document.getElementById('start-btn');
const questContainerElement = document.getElementById('question-area');
const questionElement = document.getElementById('question');
const answerBtns = document.getElementById('ans-btns');
const nextButton = document.getElementById('next-btn');

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    console.log('Game started');
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(questions) {
    questionElement.innerText = questions.question;
    questions.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtns.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct);
    Array.from(answerBtns.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: "What is 4 * 3?",
        answers: [
            {text: '12', correct: true},
            {text: '180', correct: false},
            {text: '54', correct: false},
            {text: '14', correct: false}
        ]
    },
    {
        question: "Who is the best footballer in the world?",
        answers: [
            {text: 'Cristiano Ronaldo', correct: false},
            {text: 'Kylian Mbappe', correct: false},
            {text: 'Mo Salah', correct: true},
            {text: 'Lionel Messi', correct: false}
        ]
    }
]