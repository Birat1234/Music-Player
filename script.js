const durationEI = document.getElementById('duration');
const currentTimeEI = document.getElementById('current-time');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
 


//Music Information
const songs = [
    {
        name: 'akull',
        displayName: 'Bahana',
        artist: 'Akull',
    },
    {
        name: 'arijit',
        displayName: 'Phir Mohabbat',
        artist: 'Arijit Singh', 
    },
    {
        name: 'honey',
        displayName: 'Love Dose',
        artist: 'Honey Singh', 
    },
    {
        name: 'jordan',
        displayName: 'Do Wari Jatt',
        artist: 'Jordan Sandhu', 
    },
    {
        name: 'sanam',
        displayName: 'Tumi Robe Nirobe',
        artist: 'Sanam', 
    }
];

let isPlaying = false;


//Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}



//Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update Music
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

//Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(x) {
    if (isPlaying) {
       const {currentTime, duration, baseURI} = x.srcElement
        
        //console.log(currentTime, duration, baseURI);
        const progressTime = (currentTime/duration)*100;
        //console.log(progressTime);
        progress.style.width = `${progressTime}%`;
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationEI.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        console.log(currentSeconds, currentMinutes);
        currentTimeEI.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function SetProgressBar(e) {
    const width = this.clientWidth;
    //console.log('width', width);
    const clickX = e.offsetX;
    console.log(clickX);
    const {duration} = music;
    console.log(clickX/width);
    console.log((clickX/width)*duration);
    music.currentTime = ((clickX/width)*duration);
}

//On Load Music
loadSong(songs[songIndex]);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', SetProgressBar);