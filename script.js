const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false },
    ],
  },
  {
    question: "What is 5 + 3?",
    answers: [
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "6", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
    ],
  },
  {
    question: "Who is the founder of Microsoft?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Mark Zuckerberg", correct: false },
      { text: "Bill Gates", correct: true },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style System", correct: false },
      { text: "Computer Style Sheet", correct: false },
      { text: "Colorful Style System", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  scoreContainer.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  scoreContainer.classList.remove("hide");
  scoreText.innerText = score;
  nextButton.innerText = "Play Again";
  nextButton.classList.remove("hide");
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();