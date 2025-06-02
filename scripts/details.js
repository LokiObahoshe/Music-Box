const params = new URLSearchParams(window.location.search);
const songId = params.get('songId');
const title = params.get('title');
const image = params.get('image');
const imageElem = document.getElementById('songImage');
const audio = document.getElementById('audioPlayer');
const songTitle = document.getElementById('songTitle');
const playPauseBtn = document.getElementById('playPause');
const playPauseIcon = document.getElementById('playPauseIcon');
const seekBar = document.getElementById('seekBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

// Song image that displays
if (image) {
    imageElem.src = `images/${image}`;
    imageElem.alt = decodeURIComponent(title) + ' cover art';
}

// Call song and play it
if (songId) {
    audio.src = `music/${songId}.mp3`;
    songTitle.textContent = decodeURIComponent(title);
    setPauseIcon();

    audio.addEventListener('canplay', () => {
        audio.play().catch(err => {
            console.warn("Autoplay was blocked:", err);
            setPlayIcon();
        });
    });
}

// Some more funky math to help with the seekBar and durationSpan
audio.addEventListener('loadedmetadata', () => {
    seekBar.max = Math.floor(audio.duration);
    durationSpan.textContent = formatTime(audio.duration);
});

// Update the time of the song as it plays
audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// The Music Bar and how the user can control it
seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
    setPauseIcon();
});

// Music Play and Pause Button and Functions
function setPlayIcon() {
    playPauseIcon.src = 'images/play.png';
    playPauseIcon.alt = 'Play';
}

function setPauseIcon() {
    playPauseIcon.src = 'images/pause.png';
    playPauseIcon.alt = 'Pause';
}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        setPauseIcon();
    } else {
        audio.pause();
        setPlayIcon();
    }
});

// Minute and Seconds math for music
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}
