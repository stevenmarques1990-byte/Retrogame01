const data = JSON.parse(localStorage.getItem("retroData")) || {
  "NES": [
    { name: "Super Mario Bros", owned: false, img: "https://via.placeholder.com/50" },
    { name: "The Legend of Zelda", owned: false, img: "https://via.placeholder.com/50" }
  ],
  "SNES": [
    { name: "Super Metroid", owned: false, img: "https://via.placeholder.com/50" }
  ],
  "Game Boy": [
    { name: "Pokémon Rouge", owned: false, img: "https://via.placeholder.com/50" }
  ],
  "Mega Drive": [
    { name: "Sonic the Hedgehog", owned: false, img: "https://via.placeholder.com/50" }
  ],
  "PlayStation 1": [
    { name: "Final Fantasy VII", owned: false, img: "https://via.placeholder.com/50" }
  ],
  "Nintendo 64": [
    { name: "Super Mario 64", owned: false, img: "https://via.placeholder.com/50" }
  ]
};

const consoleSelect = document.getElementById("consoleSelect");
const gameList = document.getElementById("gameList");

function save() {
  localStorage.setItem("retroData", JSON.stringify(data));
}

function loadConsoles() {
  consoleSelect.innerHTML = "";
  Object.keys(data).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    consoleSelect.appendChild(opt);
  });
  loadGames();
}

function loadGames() {
  gameList.innerHTML = "";
  data[consoleSelect.value].forEach((game, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${game.img}">
      <input type="checkbox" ${game.owned ? "checked" : ""} 
        onchange="toggle(${index})">
      ${game.name}
    `;
    gameList.appendChild(li);
  });
}

function toggle(i) {
  data[consoleSelect.value][i].owned = !data[consoleSelect.value][i].owned;
  save();
}

function addGame() {
  const name = prompt("Nom du jeu ?");
  if (!name) return;
  data[consoleSelect.value].push({
    name,
    owned: false,
    img: "https://via.placeholder.com/50"
  });
  save();
  loadGames();
}

consoleSelect.onchange = loadGames;
loadConsoles();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
