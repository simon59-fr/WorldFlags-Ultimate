const container = document.getElementById("countries-container");

function showCountries() {
  countries.forEach(country => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "8px";
    div.style.margin = "10px";
    div.style.padding = "10px";
    div.style.width = "180px";
    div.style.textAlign = "center";
    div.style.background = "#fff";

    const img = document.createElement("img");
    img.src = country.flag; // URL du drapeau
    img.alt = country.name_en;
    img.style.width = "100px";
    img.style.height = "60px";
    img.style.objectFit = "cover";
    img.style.border = "1px solid #000";

    const nameFr = document.createElement("p");
    nameFr.textContent = country.name_fr;

    const nameEn = document.createElement("p");
    nameEn.textContent = country.name_en;

    const nameDe = document.createElement("p");
    nameDe.textContent = country.name_de;

    const code = document.createElement("p");
    code.textContent = "Abréviation : " + country.code;

    div.appendChild(img);
    div.appendChild(nameFr);
    div.appendChild(nameEn);
    div.appendChild(nameDe);
    div.appendChild(code);

    container.appendChild(div);
  });
}

// Affiche les pays après chargement
showCountries();