// js/countries.js
// Charge les pays depuis REST Countries et prépare une liste de noms dans TOUTES les langues.

// Accessible globalement
window.countries = [];

function collectAllNames(country) {
  const names = new Set();

  // Noms principaux
  if (country?.name?.common) names.add(country.name.common);
  if (country?.name?.official) names.add(country.name.official);

  // Traductions (common + official)
  const translations = country?.translations || {};
  for (const key of Object.keys(translations)) {
    const t = translations[key];
    if (t?.common) names.add(t.common);
    if (t?.official) names.add(t.official);
  }

  // Autres orthographes (souvent utile)
  const alt = country?.altSpellings || [];
  for (const s of alt) {
    if (s) names.add(s);
  }

  // Nettoyage : enlever entrées vides
  return Array.from(names).filter(Boolean);
}

async function loadCountries() {
  // On récupère les champs utiles (plus rapide)
  const url = "https://restcountries.com/v3.1/all?fields=name,translations,flags,cca3,altSpellings";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur API REST Countries : " + response.status);
  }

  const data = await response.json();

  window.countries = data
    .map(country => {
      const name_fr = country.translations?.fra?.common || country.name?.common || "Inconnu";
      const name_de = country.translations?.deu?.common || country.name?.common || "Unknown";
      const name_en = country.name?.common || "Unknown";

      let customCode = country.cca3 || "";

      // Exceptions personnalisées (comme tu avais)
      if (name_fr === "Émirats arabes unis") customCode = "EAU";
      if (name_fr === "États-Unis") customCode = "USA";
      if (name_fr === "Royaume-Uni") customCode = "UK";

      const flag = country.flags?.png || "";

      return {
        name_fr,
        name_en,
        name_de,
        code: customCode,
        flag,
        // ✅ Tous les noms acceptés dans le quiz
        names_all: collectAllNames(country)
      };
    })
    // On garde seulement ceux qui ont un drapeau
    .filter(c => c.flag);

  console.log("Pays chargés :", window.countries.length);
  return window.countries;
}

// IMPORTANT : promesse globale pour attendre le chargement
window.countriesReady = loadCountries().catch(err => {
  console.error(err);
  window.countries = [];
  return [];
});