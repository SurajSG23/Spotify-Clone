let currentSong = new Audio();
currentSong.volume = 0.4
let idG = 0
let name1 = document.getElementsByClassName("song-name")[0]
async function getSongs() {
    let a = await fetch("https://github.com/SurajSG23/Spotify-Clone/blob/main/Assets%20for%20Spotify/Songs/")
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }
    return songs

}
function convertSecondsToMMSS(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track) => {
    currentSong.src = "/Assets%20for%20Spotify/Songs/" + track.trim().replace(" <p>", "-").replace(" ", "%20") + ".mp3"
    currentSong.play()
    document.getElementsByClassName("songtime")[0].style.opacity = '0.7';
    document.getElementsByClassName("seek")[0].style.opacity = '0.7';
    document.getElementsByClassName("play-bar")[0].style.bottom = '-1px';
}

async function playFavMusic(id) {
    let songs = await getSongs();
    currentSong.src = songs[id];
    currentSong.play();
    document.getElementsByClassName("songtime")[0].style.opacity = '0.7';
    document.getElementsByClassName("seek")[0].style.opacity = '0.7';
    document.getElementsByClassName("play-bar")[0].style.bottom = '-1px';
    name1.innerHTML = songs[id].replaceAll("%20", " ").split("/Songs/")[1].split("-")[0] + "<br>" + songs[id].replaceAll("%20", " ").replace(".mp3", " ").split("-")[1]
}

prev.addEventListener("click", () => {
    if (idG == 0) {
        playFavMusic(11)
    }
    else {
        playFavMusic(idG - 1)
    }
    idG--;
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`
})
next.addEventListener("click", () => {
    idG = (idG + 1) % 12
    playFavMusic(idG);
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`
})
play.addEventListener('click', () => {
    if (currentSong.paused) {
        currentSong.play();
        play.innerHTML = `<i class="fa-solid fa-pause"></i>`
    }
    else {
        currentSong.pause();
        play.innerHTML = `<i class="fa-solid fa-play"></i>`
    }
})

async function main() {
    let songs = await getSongs();
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><i class="fa-solid fa-music"></i>
                       <div><p>${song.replaceAll("%20", " ").split("/Songs/")[1].split("-")[0]}</p><p>${song.replaceAll("%20", " ").replace(".mp3", " ").split("-")[1]}</p></div><i class="fa-solid fa-play play-3"></i>
                        </li>`;
    }
    var a = document.getElementsByClassName("items-2")
    var b = document.getElementsByClassName("green-play");

    for (let index = 0; index < a.length; index++) {
        let c = a[index].getElementsByClassName("green-play")[0];
        a[index].addEventListener('mouseover', function () {
            c.style.opacity = '1'
            c.style.bottom = '34px'
        }, false);

        c.addEventListener("click", () => {
            play.innerHTML = `<i class="fa-solid fa-pause"></i>`
        })

        a[index].addEventListener("mouseout", function () {
            c.style.opacity = '0';
            c.style.bottom = '28px';
            c.style.backgroundColor = 'rgb(0, 184, 0)';
        }, false);

        c.addEventListener("mouseover", () => {
            c.style.backgroundColor = 'rgb(0, 214, 0)';
        });

        b[index].addEventListener("click", element => {
            playFavMusic(index)
            idG = index;
        })

        let cont = document.getElementsByClassName("songList")[0].childNodes[1].children

        let play2 = document.getElementsByClassName("play-2")[0].childNodes[0]

        for (let index = 0; index < cont.length; index++) {
            let cont2 = cont[index].childNodes[3];
            let cont3 = cont[index]
            cont3.addEventListener("click", () => {
                play.innerHTML = `<i class="fa-solid fa-pause"></i>`

            })
            let c = a[index].getElementsByClassName("green-play")[0];
            cont[index].addEventListener("mouseover", function () {
                cont2.style.opacity = '1'
                cont2.style.right = '50px'
            }, false)
            cont[index].addEventListener("mouseout", function () {
                cont2.style.opacity = '0'
                cont2.style.right = '20px'
            }, false)


            cont[index].addEventListener("click", element => {
                name1.innerHTML = cont[index].childNodes[2].innerHTML
                playMusic(cont[index].childNodes[2].innerHTML.trim().replace("<p>", " ").replaceAll("</p>", " "))
            })
        }

    }
    currentSong.addEventListener("timeupdate", () => {
        document.getElementsByClassName("songtime")[0].innerHTML = `${convertSecondsToMMSS(currentSong.currentTime)}/${convertSecondsToMMSS(currentSong.duration)}`
        document.getElementsByClassName("circle")[0].style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"

    })
    document.getElementsByClassName("seekBar")[0].addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.getElementsByClassName("circle")[0].style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
       
    })

    let slider = document.getElementById("volume");
    let volL = document.getElementsByClassName("vol-low")[0]
    let volM = document.getElementsByClassName("vol-med")[0]
    let volH = document.getElementsByClassName("vol-high")[0]

    slider.addEventListener("mousemove", () => {
        slider.style.background = 'linear-gradient(90deg,rgb(162, 162, 162) ' + slider.value + '%' + ',white ' + slider.value + '%)'
    })
    slider.oninput = function () {
        currentSong.volume = slider.value / 100;
        if (currentSong.volume == 0) {
            volL.style.opacity = '1';
            volM.style.opacity = '0';
            volH.style.opacity = '0';
        }
        if (currentSong.volume > 0 && currentSong.volume < 0.6) {
            volL.style.opacity = '0';
            volM.style.opacity = '1';
            volH.style.opacity = '0';
        }
        if (currentSong.volume > 0.6) {
            volL.style.opacity = '0';
            volM.style.opacity = '0';
            volH.style.opacity = '1';
        }
    }
    let vol2 = document.getElementsByClassName("volume-2")[0]
    vol2.addEventListener("click", () => {
        currentSong.volume = 0;
        volL.style.opacity = '1';
        volM.style.opacity = '0'; 
        volH.style.opacity = '0';
        slider.style.background = 'linear-gradient(90deg,rgb(162, 162, 162) 0%,white 0%)';
        slider.value = '0';
    })   
}
main();
