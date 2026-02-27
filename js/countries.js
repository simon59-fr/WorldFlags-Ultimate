// js/countries.js

let countries = [];

async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  countries = data.map(country => {

    // Nom en français
    const name_fr = country.translations?.fra?.common || country.name.common;

    // Nom en allemand
    const name_de = country.translations?.deu?.common || country.name.common;

    // Nom en anglais
    const name_en = country.name.common;

    // Abréviation personnalisée
    let customCode = country.cca3; // base = code 3 lettres

    // Exception spéciale comme tu veux :
    if (name_fr === "Émirats arabes unis") {
      customCode = "EAU";
    }

    if (name_fr === "États-Unis") {
      customCode = "USA";
    }

    if (name_fr === "Royaume-Uni") {
      customCode = "UK";
    }

    return {
      name_fr,
      name_en,
      name_de,
      code: customCode,
      flag: country.flags.png
    };
  });

  console.log("Pays chargés :", countries.length);
}

loadCountries();