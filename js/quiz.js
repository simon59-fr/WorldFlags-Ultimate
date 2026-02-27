let quizCountries = [...countries]; // copie de tous les pays
let currentIndex = 0;
let score = 0;
let totalQuestions = 100;

// Mélange les pays
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

quizCountries = shuffle(quizCountries).slice(0, totalQuestions);

const flagImg = document.getElementById("flag-img");
const inputAnswer = document.getElementById("input-answer");
const submitBtn = document.getElementById("submit-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const feedback = document.getElementById("feedback");

let timeLeft = 15 * 60; // 15 minutes en secondes

function startTimer() {
  const interval = setInterval(() => {
    if(timeLeft <=0){
      clearInterval(interval);
      endQuiz();
      return;
    }
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerDisplay.textContent = `Temps restant : ${min}:${sec.toString().padStart(2,'0')}`;
  }, 1000);
}

function showCountry() {
  if(currentIndex >= quizCountries.length){
    endQuiz();
    return;
  }
  feedback.textContent = "";
  inputAnswer.value = "";
  flagImg.src = quizCountries[currentIndex].flag;
}

function checkAnswer(){
  const answer = inputAnswer.value.trim().toLowerCase();
  const country = quizCountries[currentIndex];
  if([country.name_fr, country.name_en, country.name_de].some(n => n.toLowerCase() === answer)){
    score++;
    feedback.textContent = "✅ Correct !";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `❌ Faux ! C'était : ${country.name_fr}`;
    feedback.style.color = "red";
  }
  currentIndex++;
  scoreDisplay.textContent = `Score : ${score} / ${currentIndex}`;
  setTimeout(showCountry, 1000);
}

// Événement bouton
submitBtn.addEventListener("click", checkAnswer);

// Démarrage
showCountry();
startTimer();