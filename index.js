const player = document.querySelector(".player");
const btnPlay = document.querySelector(".img-satrt");
const btnPause = document.querySelector(".img-pause");
const btnNext = document.querySelector(".img-next");
const btnPrev = document.querySelector(".img-prev");
const audio = document.querySelector(".audio");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress");
const nameSound = document.querySelector(".name-sound");
const fotoSound = document.querySelector(".img-with-dound");
const inputFile = document.querySelector(".input-file");
const animation = document.querySelectorAll(".brop");

let sounds = [
  "1691745204_ln20mrglv2020d097d0b0d0b9d0b2d0bd18.mp3",
  "1692032590_sklrr2020d09d0bd0bbd0b8d188d0bdd196d0bcd0b8.mp3",
  "music.mp3",
  "1693061758_2xrmprtmp893487.mp3",
];
const savedSounds = localStorage.getItem("sounds");
if (savedSounds) {
  sounds = JSON.parse(savedSounds);
}

function saveSoundsToLocalStorage() {
  localStorage.setItem("sounds", JSON.stringify(sounds));
}
function pushName() {
  const files = inputFile.files;

  for (let i = 0; i < files.length; i++) {
    sounds.push(files[i].name);
  }
  saveSoundsToLocalStorage();
}
inputFile.addEventListener("change", pushName);

let nameSoundIndex = 0;
function loadSoung(sound) {
  nameSound.innerHTML = sound;
  audio.src = `audio/${sound}`;
  fotoSound.src = `images/fotoSound${nameSoundIndex + 1}.jpg`;
}
loadSoung(sounds[nameSoundIndex]);

function startAnimation() {
  animation.forEach((item) => {
    if (item.classList.contains("not-animation")) {
      item.classList.remove("not-animation");
    }
  });
}
function stopAnimation() {
  animation.forEach((item) => {
    if (!item.classList.contains("not-animation")) {
      item.classList.add("not-animation");
    }
  });
}
function palyMusik() {
  btnPlay.classList.add("hide");
  btnPause.classList.remove("hide");
  nameSound.classList.add("animation");
  audio.play();
}

function pauseMusik() {
  btnPlay.classList.remove("hide");
  btnPause.classList.add("hide");
  nameSound.classList.remove("animation");
  audio.pause();
}

btnPlay.addEventListener("click", palyMusik);
btnPlay.addEventListener("click", startAnimation);
btnPause.addEventListener("click", pauseMusik);
btnPause.addEventListener("click", stopAnimation);

function nextSound() {
  nameSoundIndex++;
  if (nameSoundIndex > sounds.length - 1) {
    nameSoundIndex = 0;
  }
  loadSoung(sounds[nameSoundIndex]);
  palyMusik();
  startAnimation();
}
function prevSound() {
  nameSoundIndex--;
  if (nameSoundIndex < 0) {
    nameSoundIndex = sounds.length - 1;
  }
  loadSoung(sounds[nameSoundIndex]);
  palyMusik();
  startAnimation();
}

btnNext.addEventListener("click", nextSound);
btnPrev.addEventListener("click", prevSound);

// progress bar
function abdateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPresent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPresent}%`;
}

audio.addEventListener("timeupdate", abdateProgress);

// перемотка

function setProgress(e) {
  const widnt = this.clientWidth;
  const widntX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (widntX / widnt) * duration;
}

progressContainer.addEventListener("click", setProgress);

// autoplay
audio.addEventListener("ended", nextSound);

// add musiks
