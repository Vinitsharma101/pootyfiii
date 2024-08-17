console.log("Hi, your JavaScript is ready");
let currentSong = new Audio();

function playMusic(track) {
    console.log(`Now playing: ${track}`);

    currentSong.pause();
    currentSong.currentTime = 0;

    currentSong.src = `/DownloadedSongs/${track}.mp3`;
    currentSong.load();
    currentSong.play();
}



async function Getsongs() {
    try {
        let response = await fetch("http://127.0.0.1:3000/DownloadedSongs/");
        let text = await response.text();

        let div = document.createElement("div");
        div.innerHTML = text;
        let songLinks = div.getElementsByTagName("a");

        let songs = [];
        for (let element of songLinks) {
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href);
            }
        }
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

async function main() {
    
        let songs = await Getsongs();
        console.log("Songs fetched:", songs);

        let songUL = document.querySelector(".songlist ul");

        if (!songUL) {
            console.error("No <ul> element found inside the .songlist class");
            return;
        }

        songUL.innerHTML = "";


        const svgIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M10 15.5C10 16.3284 9.32843 17 8.5 17C7.67157 17 7 16.3284 7 15.5C7 14.6716 7.67157 14 8.5 14C9.32843 14 10 14.6716 10 15.5ZM10 15.5V11C10 10.1062 10 9.65932 10.2262 9.38299C10.4524 9.10667 10.9638 9.00361 11.9865 8.7975C13.8531 8.42135 15.3586 7.59867 16 7V13.5M16 13.75C16 14.4404 15.4404 15 14.75 15C14.0596 15 13.5 14.4404 13.5 13.75C13.5 13.0596 14.0596 12.5 14.75 12.5C15.4404 12.5 16 13.0596 16 13.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;

        const svgIcon2 = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#90ee90" fill="none">
                <path d="M7 9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7C5.88071 7 7 8.11929 7 9.5ZM7 9.5V2C7.33333 2.5 7.6 4.6 10 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="10.5" cy="19.5" r="2.5" stroke="currentColor" stroke-width="1.5" />
                <circle cx="20" cy="18" r="2" stroke="currentColor" stroke-width="1.5" />
                <path d="M13 19.5L13 11C13 10.09 13 9.63502 13.2466 9.35248C13.4932 9.06993 13.9938 9.00163 14.9949 8.86504C18.0085 8.45385 20.2013 7.19797 21.3696 6.42937C21.6498 6.24509 21.7898 6.15295 21.8949 6.20961C22 6.26627 22 6.43179 22 6.76283V17.9259" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 13C17.8 13 21 10.6667 22 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;

        for (const song of songs) {
            if (typeof song === 'string') {
                let songName = song.split('/').pop().split('%20').join(' ').replace(/\.mp3$/, '');
        
                const listItem = document.createElement('li');
                
                // Wrap song name inside a div with the "info" class
                listItem.innerHTML = `
                    ${svgIcon} 
                    <div class="info"><span>${songName}</span></div> 
                    ${svgIcon2}
                `;
                
                songUL.appendChild(listItem);
            } else {
                console.error('Invalid song entry:', song);
            }
        }
        
        Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((element) => {
            element.addEventListener("click", (e) => {
                let songTitle = element.querySelector(".info span").innerHTML.trim();
                playMusic(songTitle);
            });
        });
        
}

main();
