import { musicExample } from './example.js';

const container = document.getElementById('musicContainer');

musicExample.forEach(song => {
    const songDiv = document.createElement('div');

    // Play Button Creation
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.classList.add('songButton');

    // Audio Element Creation
    playButton.addEventListener('click', () => {
        window.location.href = `details.html?songId=${song.songId}&title=${encodeURIComponent(song.title)}&image=${encodeURIComponent(song.image)}`;
    });

    songDiv.innerHTML = `
        <strong>Title:</strong> ${song.title}<br>
    `;
    songDiv.classList.add('songCards');

    songDiv.appendChild(playButton);
    container.appendChild(songDiv);
});
