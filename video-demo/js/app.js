const video = document.getElementById('myVideo');
const playPauseBtn = document.getElementById('playPause');
const seek = document.getElementById('seek');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const muteToggle = document.getElementById('muteToggle');
const volume = document.getElementById('volume');
const fullscreenToggle = document.getElementById('fullscreenToggle');

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Set duration once loaded
video.addEventListener('loadedmetadata', () => {
  seek.max = video.duration;
  durationDisplay.textContent = formatTime(video.duration);
});

// Update time while playing
video.addEventListener('timeupdate', () => {
  seek.value = video.currentTime;
  currentTimeDisplay.textContent = formatTime(video.currentTime);
});


// Play/pause button
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '⏸️';
    playPauseBtn.setAttribute('aria-label', 'Pause');
  } else {
    video.pause();
    playPauseBtn.textContent = '▶️';
    playPauseBtn.setAttribute('aria-label', 'Play');
  }
});

// Mute toggle
muteToggle.addEventListener('click', () => {
  video.muted = !video.muted;
  muteToggle.textContent = video.muted ? '🔇' : '🔊';
  muteToggle.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
});

// Volume slider
volume.addEventListener('input', () => {
  video.volume = volume.value;
  video.muted = volume.value == 0;
  muteToggle.textContent = video.muted ? '🔇' : '🔊';
});

// Fullscreen toggle
fullscreenToggle.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
