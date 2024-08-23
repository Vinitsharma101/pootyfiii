console.log("Hi, your JavaScript is ready");

let currentSong = null;
let playPauseButton = document.getElementById('playPauseButton');
let audioElement = document.getElementById('audioElement');

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function playMusic(trackURL) {
    console.log(`Now playing: ${trackURL}`);
    if (currentSong) {
        currentSong.pause();
        currentSong.currentTime = 0;
    }
    currentSong = new Audio(trackURL);
    currentSong.play();
    playPauseButton.src = "/assets/pause.svg";
}

async function getSongs() {
    try {
        let response = await fetch("http://localhost:3000/DownloadedSongs");
        let songs = await response.json();
        return songs.map(song => `/DownloadedSongs/${song}`);
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

function togglePlayPause() {
    if (currentSong) {
        if (currentSong.paused) {
            currentSong.play();
            playPauseButton.src = "/assets/pause.svg";
        } else {
            currentSong.pause();
            playPauseButton.src = "/assets/play.svg";
        }
    }
}

async function main() {
    let songs = await getSongs();
    console.log("Songs fetched:", songs);

    let songUL = document.querySelector(".songlist ul");
    if (!songUL) {
        console.error("No <ul> element found ..nhi mile bhai..inside the .songlist class");
        return;
    }

    songUL.innerHTML = "";

    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
            <path d="M10 15.5C10 16.3284 9.32843 17 8.5 17C7.67157 17 7 16.3284 7 15.5C7 14.6716 7.67157 14 8.5 14C9.32843 14 10 14.6716 10 15.5ZM10 15.5V11C10 10.1062 10 9.65932 10.2262 9.38299C10.4524 9.10667 10.9638 9.00361 11.9865 8.7975C13.8531 8.42135 15.3586 7.59867 16 7V13.5M16 13.75C16 14.4404 15.4404 15 14.75 15C14.0596 15 13.5 14.4404 13.5 13.75C13.5 13.0596 14.0596 12.5 14.75 12.5C15.4404 12.5 16 13.0596 16 13.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;

    for (const song of songs) {
        let songName = decodeURIComponent(song.split('/').pop()).replace(/\.mp3$/, '');

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${svgIcon} 
            <div class="info"><span>${songName}</span></div> 
        `;

        listItem.addEventListener("click", () => playMusic(song));
        songUL.appendChild(listItem);
    }

    playPauseButton.addEventListener('click', togglePlayPause);
}

main();