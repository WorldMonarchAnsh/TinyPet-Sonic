let hunger = 5;
let happiness = 5;
let energy = 5;
let rings = 0;

const STORAGE_KEY = 'tinyPetStats';

const sounds = {
  feed: new Audio('./sounds/Feeding.mp3'),
  play: new Audio('./sounds/Jump.mp3'), // or Spin Dash
  sleep: new Audio('./sounds/Sleeping.mp3')
};

function loadStats() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved) {
    hunger = saved.hunger;
    happiness = saved.happiness;
    energy = saved.energy;
    rings = saved.rings || 0;
  }
}

function saveStats() {
  const stats = {
    hunger,
    happiness,
    energy,
    rings
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function updateMood() {
  const mood = document.getElementById('mood');
  const message = document.getElementById('message');

  mood.classList.remove('bounce');
  void mood.offsetWidth;
  mood.classList.add('bounce');

  if (hunger <= 2) {
    mood.textContent = '😫';
    message.textContent = "I'm sooo hungry... got any chili dogs?";
  } else if (energy <= 2) {
    mood.textContent = '😴';
    message.textContent = "I'm too sleepy to run...";
  } else if (happiness <= 2) {
    mood.textContent = '😢';
    message.textContent = "I'm bored! Wanna play?";
  } else if (hunger >= 8 && happiness >= 8 && energy >= 8) {
    mood.textContent = '😄';
    message.textContent = "Feeling awesome! Let’s go fast!! 💨";
    addRing();
  } else {
    mood.textContent = '😐';
    message.textContent = "I'm chillin’~";
  }
}

function updateStats() {
  document.getElementById('hunger').textContent = hunger;
  document.getElementById('happiness').textContent = happiness;
  document.getElementById('energy').textContent = energy;
  document.getElementById('ringCount').textContent = rings;
  updateMood();
  saveStats();
}

function feed() {
  sounds.feed.play();
  hunger = Math.min(hunger + 1, 10);
  happiness = Math.min(happiness + 1, 10);
  energy = Math.max(energy - 1, 0);
  updateStats();
  document.getElementById("pet-img").src = "./images/sonic-awake.png";
}

function play() {
  sounds.play.play();
  happiness = Math.min(happiness + 2, 10);
  energy = Math.max(energy - 2, 0);
  hunger = Math.max(hunger - 1, 0);
  updateStats();
  document.getElementById("pet-img").src = "./images/sonic-awake.png";
}

function sleep() {
  sounds.sleep.play();
  energy = Math.min(energy + 3, 10);
  hunger = Math.max(hunger - 1, 0);
  happiness = Math.max(happiness - 1, 0);

  document.getElementById("pet-img").src = "./images/sonic-sleep.png";
  setTimeout(() => {
    document.getElementById("pet-img").src = "./images/sonic-awake.png";
  }, 4000);

  updateStats();
}

function resetGame() {
  localStorage.removeItem(STORAGE_KEY);
  hunger = 5;
  happiness = 5;
  energy = 5;
  rings = 0;
  updateStats();
  document.getElementById('message').textContent = "Reset complete! Ready to go!";
  document.getElementById("pet-img").src = "./images/sonic-awake.png";
}

function toggleNightMode() {
  document.body.classList.toggle('night');
}

function decayStats() {
  hunger = Math.max(hunger - 1, 0);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);
  updateStats();
}

function addRing() {
  rings++;
  const ringSound = new Audio('./sounds/Ring Sound.mp3');
  ringSound.play();
  updateStats();
}

window.onload = () => {
  loadStats();
  updateStats();
  setInterval(decayStats, 10000);
};
