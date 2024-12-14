let currentSong = new Audio();
currentSong.volume = 0.4;
let idG = 0;
let name1 = document.getElementsByClassName("song-name")[0];

// Manually added list of songs with their raw GitHub URLs
async function getSongs() {
    const songs = [
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/7%20Years-Lukas%20Graham.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Aankhon%20Se%20Batana-Harshit%20Saini.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Anisuthide-Sonu%20Nigam.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Belageddu-Vijay%20Prakash.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Kaise%20Hua-Vishal%20Mishra.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Love%20Story-Taylor%20Swift.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Love%20Yourself%20-Justin%20Bieber.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Ninnindale-Sonu%20Nigam.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Ondu%20Malebillu-Armaan%20Malik.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Perfect-Ed%20Sheeran.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Soch%20Na%20Sake-Arijit%20Singh.mp3",
        "https://raw.githubusercontent.com/SurajSG23/Spotify-Clone/main/Assets%20for%20Spotify/Songs/Tu%20Jaane%20Na-Atif%20Aslam.mp3"
    ];
    return songs;
}

function convertSecondsToMMSS(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track) => {
    currentSong.src = track;
    currentSong.play();
    document.getElementsByClassName("songtime")[0].style.opacity = "0.7";
    document.getElementsByClassName("seek")[0].style.opacity = "0.7";
    document.getElementsByClassName("play-bar")[0].style.bottom = "-1px";
};

async function playFavMusic(id) {
    let songs = await getSongs();
    currentSong.src = songs[id];
    currentSong.play();
    document.getElementsByClassName("songtime")[0].style.opacity = "0.7";
    document.getElementsByClassName("seek")[0].style.opacity = "0.7";
    document.getElementsByClassName("play-bar")[0].style.bottom = "-1px";
    name1.innerHTML = songs[id].split("/Songs/")[1].replace(".mp3", "").replaceAll("%20", " ");
}

prev.addEventListener("click", async () => {
    const songs = await getSongs();
    idG = (idG - 1 + songs.length) % songs.length; // Loop backward
    playFavMusic(idG);
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});

next.addEventListener("click", async () => {
    const songs = await getSongs();
    idG = (idG + 1) % songs.length; // Loop forward
    playFavMusic(idG);
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});

play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        currentSong.pause();
        play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
});

async function main() {
    let songs = await getSongs();
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        let songName = song.split("/Songs/")[1].split(".mp3")[0].replaceAll("%20", " ");
        songUL.innerHTML += `<li><i class="fa-solid fa-music"></i>
                       <div><p>${songName}</p></div><i class="fa-solid fa-play play-3"></i>
                        </li>`;
    }

    let playButtons = document.getElementsByClassName("play-3");
    for (let index = 0; index < playButtons.length; index++) {
        playButtons[index].addEventListener("click", () => {
            playFavMusic(index);
            idG = index;
            play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        });
    }

    currentSong.addEventListener("timeupdate", () => {
        document.getElementsByClassName("songtime")[0].innerHTML = `${convertSecondsToMMSS(
            currentSong.currentTime
        )}/${convertSecondsToMMSS(currentSong.duration)}`;
        document.getElementsByClassName("circle")[0].style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.getElementsByClassName("seekBar")[0].addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.getElementsByClassName("circle")[0].style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    let slider = document.getElementById("volume");
    slider.addEventListener("mousemove", () => {
        slider.style.background =
            "linear-gradient(90deg, rgb(162, 162, 162) " +
            slider.value +
            "%, white " +
            slider.value +
            "%)";
    });
    slider.oninput = function () {
        currentSong.volume = slider.value / 100;
    };
}
main();
