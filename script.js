const songs = [
  { title: "Sahiba", artist: "Artist 1", src: "songs/sahiba.mp3", cover: "images/sahiba.jpeg" },
  { title: "Shape Of You", artist: "Artist 3", src: "songs/shape of you.mp3", cover: "images/shape of you.jpeg" },
  { title: "Keariya x Pasoori", artist: "Artist 3", src: "songs/kesariya.mp3", cover: "images/ks.jpeg" }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}
loadSong(songs[songIndex]);

// Play
function playSong() {
  isPlaying = true;
  playBtn.innerText = "⏸️";
  audio.play();
  cover.style.animationPlayState = "running"; // rotate cover
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.innerText = "▶️";
  audio.pause();
  cover.style.animationPlayState = "paused"; // stop rotation
}

// Toggle Play/Pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next Song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", nextSong);

// Previous Song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
prevBtn.addEventListener("click", prevSong);

// Update progress bar
audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Update time
  let mins = Math.floor(currentTime / 60);
  let secs = Math.floor(currentTime % 60);
  if (secs < 10) secs = "0" + secs;
  currentTimeEl.innerText = `${mins}:${secs}`;

  let dmins = Math.floor(duration / 60);
  let dsecs = Math.floor(duration % 60);
  if (dsecs < 10) dsecs = "0" + dsecs;
  if (duration) durationEl.innerText = `${dmins}:${dsecs}`;
});

// Seek song
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Auto play next
audio.addEventListener("ended", nextSong);
