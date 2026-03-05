// js/learn.js

const container = document.getElementById("countries-container");
const statusText = document.getElementById("learn-status");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(country) {
  const div = document.createElement("div");
  div.className = "country-card";

  const img = document.createElement("img");
  img.src = country.flag;
  img.alt = country.name_en;

  const fr = document.createElement("p");
  fr.textContent = `FR : ${country.name_fr}`;

  const en = document.createElement("p");
  en.textContent = `EN : ${country.name_en}`;

  const de = document.createElement("p");
  de.textContent = `DE : ${country.name_de}`;

  const code = document.createElement("p");
  code.textContent = `Code : ${country.code}`;

  div.appendChild(img);
  div.appendChild(fr);
  div.appendChild(en);
  div.appendChild(de);
  div.appendChild(code);

  return div;
}

async function initLearn() {
  statusText.textContent = "Chargement des pays…";

  const list = await window.countriesReady;

  if (!list || list.length === 0) {
    statusText.textContent = "❌ Impossible de charger les pays (API). Vérifie ta connexion.";
    return;
  }

  statusText.textContent = `✅ ${window.countries.length} pays chargés (ordre aléatoire)`;

  const mixed = shuffle([...window.countries]);
  mixed.forEach(country => container.appendChild(createCard(country)));
}

initLearn();§§