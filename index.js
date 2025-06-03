let questions = [];
let currentQuestionIndex = 0;
let rightScore = 0;
let wrongScore = 0;

const questionEl = document.getElementById('question');
const trueBtn = document.getElementById('true-btn');
const falseBtn = document.getElementById('false-btn');
const scoreEl = document.getElementById('score');

// Fetch questions from the API
async function fetchQuestions() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean');
  const data = await response.json();
  questions = data.results;
  displayQuestion();
}

// Display current question
function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    // Decode HTML entities like &quot; and &#039;
    questionEl.innerHTML = decodeHTML(currentQuestion.question);
  } else {
    questionEl.innerHTML = 'Quiz completed!';
    scoreEl.innerHTML = `Your final score is: ${rightScore}/10`;
    trueBtn.style.display = 'none';
    falseBtn.style.display = 'none';
  }
}

// Compare answer and update score
function checkAnswer(userAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correct_answer;
  if (userAnswer === correctAnswer) {
    rightScore++;
    scoreEl.textContent = `Score: Right: ${rightScore} Wrong: ${wrongScore} `;
  }
  else{
    wrongScore++;
    scoreEl.textContent = `Score: Right: ${rightScore} Wrong: ${wrongScore} `;
  }
  currentQuestionIndex++;
  displayQuestion();
}

// Decode HTML entities (e.g., &quot;)
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Event listeners for buttons
trueBtn.addEventListener('click', () => checkAnswer("True"));
falseBtn.addEventListener('click', () => checkAnswer("False"));

// Initialize quiz
fetchQuestions();
