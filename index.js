// const songs = [
//     {
//         title: "Song 1",
//         src: "jinthak.mp3"
//     },
//     {
//          title: "Song 2",
//         src: "sitara.mp3"
//     },
//     {
      
//          title: "Song 3",
//         src: "natunatu.mp3"
//     },
//     {
//         title: "Song 4",
//         src: "nippulanti.mp3"
//     },
//     {
//         title: "Song 5",
//         src: "vetta.mp3"
//     },
//     {
//         title: "Song 6",
//         src: "rocky_since.mp3"
//     },
//     {
//         title: "Song 7",
//         src: "bus_scene.mp3"
//     }
// ];

const songs = [
    {
        title: "Song 1",
        src: "https://cdns-preview-4.dzcdn.net/stream/c-465dbacd317d67cc6a4d1adb22355970-2.mp3"
    },
    {
         title: "Song 2",
        src: "https://cdns-preview-9.dzcdn.net/stream/c-94e53a428fd9dbf35c5b06d800447c2a-4.mp3"
    },
    {
      
         title: "Song 3",
        src: "https://cdns-preview-d.dzcdn.net/stream/c-dbbdb0dd57e34c52b2379fb69bc7da4f-3.mp3"
    },
    {
        title: "Song 4",
        src: "https://cdns-preview-4.dzcdn.net/stream/c-46413a2a74ddd53a2f13ef2b853202f7-3.mp3"
    },
    {
        title: "Song 5",
        src: "https://cdns-preview-8.dzcdn.net/stream/c-8930ac6a4a087666b651b8aad5cd4a26-5.mp3"
    },
    {
        title: "Song 6",
        src: "https://cdns-preview-0.dzcdn.net/stream/c-095471cd71c784daa9eab6beb69c5848-3.mp3"
    },
    {
        title: "Song 7",
        src: "https://cdns-preview-4.dzcdn.net/stream/c-46413a2a74ddd53a2f13ef2b853202f7-3.mp3"
    }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');




document.addEventListener('DOMContentLoaded', function() {
    // Load the first song when page loads
    if (songs.length > 0) {
        loadSong(currentSongIndex);
    }
});

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    document.getElementById('currentSong').textContent = `Now playing: ${song.title}`;
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
}

function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
}

// Add timeupdate event listener after the existing play/pause listeners
audioPlayer.addEventListener('timeupdate', updateProgress);

// Add this new function to update progress
function updateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time-display');
    
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = percent + '%';
    
    // Update time display
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    const totalMinutes = Math.floor(audioPlayer.duration / 60);
    const totalSeconds = Math.floor(audioPlayer.duration % 60);
    
    timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
}




// Add click event for progress bar
document.querySelector('.progress-bar').addEventListener('click', function(e) {
    const progressBar = this;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const clickPercent = clickPosition / rect.width;
    
    // Ensure the percentage is between 0 and 1
    const boundedPercent = Math.max(0, Math.min(1, clickPercent));
    
    // Update audio position
    audioPlayer.currentTime = boundedPercent * audioPlayer.duration;
    
    // Update progress bar visually
    const progress = document.querySelector('.progress');
    progress.style.width = (boundedPercent * 100) + '%';
});
