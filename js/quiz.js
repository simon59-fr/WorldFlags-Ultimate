// js/quiz.js

let quizCountries = [];
let currentIndex = 0;
let score = 0;
const totalQuestions = 100;

let timeLeft = 15 * 60;
let timerInterval = null;

const flagImg = document.getElementById("flag-img");
const inputAnswer = document.getElementById("input-answer");
const submitBtn = document.getElementById("submit-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const loading = document.getElementById("loading");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Normalise texte (accents, majuscules, espaces, ponctuation)
function normalizeText(text) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ");
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function startTimer() {
  timerDisplay.textContent = `Temps restant : ${formatTime(timeLeft)}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Temps restant : ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz(true);
    }
  }, 1000);
}

function updateUI() {
  scoreDisplay.textContent = `Score : ${score} / ${totalQuestions}`;
  progress.textContent = `Question : ${Math.min(currentIndex + 1, totalQuestions)} / ${totalQuestions}`;
}

function showCountry() {
  if (currentIndex >= quizCountries.length) {
    endQuiz(false);
    return;
  }

  const country = quizCountries[currentIndex];

  flagImg.src = country.flag;
  flagImg.style.display = "block";

  inputAnswer.value = "";
  inputAnswer.focus();
  feedback.textContent = "";

  updateUI();
}

function isCorrectAnswer(userInput, country) {
  const user = normalizeText(userInput);

  // Tous les noms (toutes langues) + quelques champs
  const candidates = new Set();
  (country.names_all || []).forEach(n => candidates.add(normalizeText(n)));
  candidates.add(normalizeText(country.name_fr));
  candidates.add(normalizeText(country.name_en));
  candidates.add(normalizeText(country.name_de));
  if (country.code) candidates.add(normalizeText(country.code));

  return candidates.has(user);
}

function submitAnswer() {
  if (currentIndex >= quizCountries.length) return;

  const country = quizCountries[currentIndex];
  const answer = inputAnswer.value;

  if (!answer.trim()) {
    feedback.style.color = "#b45309";
    feedback.textContent = "⚠️ Écris une réponse d'abord.";
    return;
  }

  if (isCorrectAnswer(answer, country)) {
    score++;
    feedback.style.color = "#16a34a";
    feedback.textContent = "✅ Correct !";
  } else {
    feedback.style.color = "#dc2626";
    feedback.textContent = `❌ Faux. Réponse : ${country.name_fr} (${country.code})`;
  }

  currentIndex++;
  updateUI();

  setTimeout(showCountry, 650);
}

function endQuiz(timeOver) {
  if (timerInterval) clearInterval(timerInterval);

  flagImg.style.display = "none";
  inputAnswer.disabled = true;
  submitBtn.disabled = true;

  if (timeOver) {
    feedback.style.color = "#dc2626";
    feedback.textContent = `⏰ Temps écoulé ! Score final : ${score} / ${totalQuestions}`;
  } else {
    feedback.style.color = "#2563eb";
    feedback.textContent = `🎉 Quiz terminé ! Score final : ${score} / ${totalQuestions}`;
  }
}

async function initQuiz() {
  loading.textContent = "Chargement des pays…";

  const list = await window.countriesReady;

  if (!list || list.length === 0) {
    loading.textContent = "❌ Impossible de charger les pays (API). Vérifie ta connexion.";
    return;
  }

  quizCountries = shuffle([...window.countries]).slice(0, totalQuestions);
  loading.style.display = "none";

  updateUI();
  startTimer();
  showCountry();
}

submitBtn.addEventListener("click", submitAnswer);
inputAnswer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitAnswer();
});

initQuiz();