const playlist = [
    {
        title: "Love language",
        artist: "SZA",
        duration: "3:05",
        src: "music/sza_love_language.mp3"
    },
    {
        title: "People",
        artist: "Birdy",
        duration: "3:35",
        src: "music/people.mp3"
    },
    {
        title: "Your power",
        artist: "billie, house remix",
        duration: "6:12",
        src: "music/billie.mp3"
    },
    {
        title: "Good Days",
        artist: "Sza",
        duration: "5:39",
        src: "music/good days.mp3"
    },
    {
        title: "Angel Numbers",
        artist: "Cris Brown",
        duration: "5:07",
        src: "music/angel numbers.mp3"
    },

    {
        title: "7 Years",
        artist: "Lucas Graham",
        duration: "2:03",
        src: "music/7years-old.mp3"
    },
    {
        title: "FackuMean",
        artist: "gunna",
        duration: "2:19",
        src: "music/Fckumean.mp3"
    }
];


const audioPlayer = document.getElementById('audio-player');
const songList = document.getElementById('song-list');
const currentSongDisplay = document.getElementById('current-song');
const currentArtistDisplay = document.getElementById('current-artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');


let currentSongIndex = 0;
let isPlaying = false;


function initPlayer() {
  
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist} (${song.duration})`;
        li.addEventListener('click', () => playSong(index));
        songList.appendChild(li);
    });
    
   
    audioPlayer.volume = volumeSlider.value;
    

    loadSong(currentSongIndex);
}


function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    currentSongDisplay.textContent = song.title;
    currentArtistDisplay.textContent = song.artist;
    

    updateActiveSong();
}


function playSong(index) {
    if (index !== undefined) {
        currentSongIndex = index;
        loadSong(currentSongIndex);
    }
    
    audioPlayer.play();
    isPlaying = true;
    playBtn.textContent = '⏸';
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playBtn.textContent = '▶';
}


function updateActiveSong() {
    const songs = songList.querySelectorAll('li');
    songs.forEach((song, index) => {
        if (index === currentSongIndex) {
            song.classList.add('playing');
        } else {
            song.classList.remove('playing');
        }
    });
}


function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
}


function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
}


function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    

    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
}


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextSong);

progressBar.parentElement.addEventListener('click', setProgress);

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});


window.addEventListener('load', initPlayer);