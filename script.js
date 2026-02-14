// ===============================
// CONFIGURATION
// ===============================

const RECONNECT_DATE = "2026-01-05"; // YYYY-MM-DD
const API_URL = "http://localhost:5000";

// Question Map
const securityProtocol = [
  { q: "On which app we started talking first?", a: "instagram" },
  { q: "In which city we will first meet in?", a: "warsaw" }
];

let selectedChallenge = null;

// ===============================
// MONGODB API HELPERS
// ===============================

window.addSurprise = async function(title, message) {
  return fetch(`${API_URL}/surprise`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, message })
  });
};

window.getSurprises = async function() {
  const res = await fetch(`${API_URL}/surprises`);
  return res.json();
};

// ===============================
// AUTH
// ===============================

function initAuth() {
  selectedChallenge =
    securityProtocol[Math.floor(Math.random() * securityProtocol.length)];

  document.getElementById("question-text").innerText = selectedChallenge.q;
}

function verifyAccess() {
  const userInput = document
    .getElementById("auth-answer")
    .value.toLowerCase()
    .trim();

  if (userInput === selectedChallenge.a) {
    document.getElementById("auth-overlay").classList.add("hidden");
    document.getElementById("content").classList.remove("hidden");

    lucide.createIcons();
    startApp();
  } else {
    const error = document.getElementById("error-msg");
    error.classList.remove("hidden");
    error.classList.add("animate-shake");
  }
}

// ===============================
// UPTIME COUNTER
// ===============================

function updateUptime() {
  const start = new Date(RECONNECT_DATE);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  document.getElementById("nav-timer").innerText = `UPTIME: ${diffDays} DAYS`;
}

// ===============================
// TERMINAL EFFECT
// ===============================

function runTerminal() {
  new Typed("#typed-msg", {
    strings: [
      "Initializing handshake...^500\n",
      "Establishing encrypted connection to Ananta...^500\n",
      "Since January 5th, the signal has never been stronger.^1000\n",
      "You are the most beautiful 'bug' in my life's code.^1000\n",
      "Happy Valentine's Day! ❤️"
    ],
    typeSpeed: 40,
    showCursor: true,
    cursorChar: "▋"
  });
}

// ===============================
// SURPRISE LIST (MongoDB)
// ===============================

async function renderSurprises() {
  const data = await getSurprises();
  const list = document.getElementById("todo-list");

  list.innerHTML = "";

  data.forEach(s => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `<span>${s.title}</span>`;
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById("todo-input");

  if (input.value.trim() !== "") {
    addSurprise(input.value.trim(), "💖").then(renderSurprises);
    input.value = "";
  }
}

// ===============================
// START APP
// ===============================

function startApp() {
  updateUptime();
  runTerminal();
  renderSurprises();
}

// ===============================
// INIT
// ===============================

window.onload = initAuth;
