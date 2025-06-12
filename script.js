let hunger = 5;
let happiness = 5;
let energy = 5;
let rings = 0;

const sounds = {
  feed: new Audio('./sounds/Feeding.mp3'),
  play: new Audio('./sounds/Jump.mp3'),
  sleep: new Audio('./sounds/Sleeping.mp3'),
  ring: new Audio('./sounds/Ring Sound.mp3'),
  special: new Audio('./sounds/100 Rings Jingle.mp3'), // 🎉 NEW
  sad: new Audio('./sounds/Sad.mp3') // Make sure this is defined
};

function updateStats() {
  document.getElementById('hunger').textContent = hunger;
  document.getElementById('happiness').textContent = happiness;
  document.getElementById('energy').textContent = energy;
  updateMood();
  localStorage.setItem("hunger", hunger);
  localStorage.setItem("happiness", happiness);
  localStorage.setItem("energy", energy);
  localStorage.setItem("rings", rings);
}

function updateMood() {
  const mood = document.getElementById('mood');
  const message = document.getElementById('message');

  if (hunger <= 2 || happiness <= 2 || energy <= 2) {
    mood.textContent = '😢';
    message.textContent = "Sonic’s feeling low... Give him some love!";
    sounds.sad.play();
  } else if (hunger > 5 && happiness > 5 && energy > 5) {
    mood.textContent = '😄';
    message.textContent = "Feeling awesome! Let’s go fast!! 💨";
    addRing();
  } else {
    mood.textContent = '😐';
    message.textContent = "Sonic is doing okay!";
  }

  document.getElementById('ringCount').textContent = rings;
}

function feed() {
  sounds.feed.play();
  hunger = Math.min(hunger + 2, 10);
  happiness = Math.min(happiness + 1, 10);
  updateStats();
}

function play() {
  sounds.play.play();
  happiness = Math.min(happiness + 2, 10);
  energy = Math.max(energy - 1, 0);
  updateStats();
}

function sleep() {
  sounds.sleep.play();
  energy = Math.min(energy + 3, 10);
  hunger = Math.max(hunger - 1, 0);
  happiness = Math.min(happiness + 1, 10);
  document.getElementById("pet-img").src = "./images/sonic-sleep.png";
  setTimeout(() => {
    document.getElementById("pet-img").src = "./images/sonic-awake.png";
  }, 4000);
  updateStats();
}

function resetGame() {
  hunger = 5;
  happiness = 5;
  energy = 5;
  rings = 0;
  updateStats();
}

function addRing() {
  rings++;
  sounds.ring.play();
  localStorage.setItem("rings", rings);
  document.getElementById('ringCount').textContent = rings;

  if (rings % 100 === 0) {
    setTimeout(() => {
      sounds.special.play().catch(() => {});
      alert("🎉 100 Rings! Sonic leveled up!");
    }, 300); // small delay after ring sound
  }
}

function toggleNightMode() {
  document.body.classList.toggle("night");
}

function decayStats() {
  hunger = Math.max(hunger - 1, 0);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);
  updateStats();
}

window.onload = () => {
  hunger = parseInt(localStorage.getItem("hunger")) || 5;
  happiness = parseInt(localStorage.getItem("happiness")) || 5;
  energy = parseInt(localStorage.getItem("energy")) || 5;
  rings = parseInt(localStorage.getItem("rings")) || 0;
  updateStats();
};

setInterval(decayStats, 60000);
