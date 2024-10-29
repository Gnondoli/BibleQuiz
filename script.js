const quizData = [
    {
        question: "Qui a baptisé Jésus ?",
        answers: ["Pierre", "Jean-Baptiste", "Paul", "Moïse"],
        correct: 1
    },
    {
        question: "Quel est le premier miracle de Jésus dans le Nouveau Testament ?",
        answers: ["Guérison d'un lépreux", "Multiplication des pains", "Transformation de l'eau en vin", "Marche sur l'eau"],
        correct: 2
    },
    {
        question: "Combien de disciples Jésus a-t-il choisis pour être ses apôtres ?",
        answers: ["10", "12", "7", "5"],
        correct: 1
    },
    {
        question: "Quel apôtre a renié Jésus trois fois ?",
        answers: ["Jacques", "Jean", "Pierre", "André"],
        correct: 2
    },
    {
        question: "Où Jésus est-il né ?",
        answers: ["Nazareth", "Bethléem", "Jérusalem", "Capharnaüm"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Shuffle both questions and answers
function initializeQuiz() {
    shuffleArray(quizData);
    quizData.forEach(shuffleAnswers);
}

// Function to shuffle answers and adjust the correct index
function shuffleAnswers(quizItem) {
    const answersWithIndices = quizItem.answers.map((answer, index) => ({ answer, index }));
    shuffleArray(answersWithIndices);
    quizItem.answers = answersWithIndices.map(item => item.answer);
    quizItem.correct = answersWithIndices.findIndex(item => item.index === quizItem.correct);
}

function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    const questionEl = document.getElementById("question");
    const answerButtons = document.querySelectorAll(".answer");

    questionEl.innerText = currentQuizData.question;
    answerButtons.forEach((button, index) => {
        button.innerText = currentQuizData.answers[index];
        button.classList.remove("selected");
    });
    selectedAnswer = null;
}

function selectAnswer(answerIndex) {
    const answerButtons = document.querySelectorAll(".answer");
    answerButtons.forEach((button, index) => {
        button.classList.toggle("selected", index === answerIndex);
    });
    selectedAnswer = answerIndex;
}

function submitAnswer() {
    if (selectedAnswer === null) return;

    const correctAnswer = quizData[currentQuestion].correct;
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        displayScore();
    }
}

function displayScore() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `<h2>Vous avez obtenu ${score} sur ${quizData.length} points</h2>`;
}

// Initialize quiz on page load
document.addEventListener("DOMContentLoaded", () => {
    initializeQuiz();
    loadQuiz();
});
