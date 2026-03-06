// Video
const video = document.querySelector("#video")

// Controls
const playPauseBtn = document.querySelector("#playPauseBtn")
const volumeIcon = document.querySelector("#volumeIcon")
const volumeSlider = document.querySelector("#volumeSlider")
const seekbar = document.querySelector("#seekbar")
const speedControl = document.querySelector("#speedControl")
const fullScreenBtn = document.querySelector("#fullScreenBtn")
const loopBtn = document.querySelector("#loopBtn")

// Tooltips
const playTooltip = document.querySelector("#playTooltip")
const volumeTooltip = document.querySelector("#volumeTooltip")
const fullscreenTooltip = document.querySelector("#fullscreenTooltip")
const loopTooltip = document.querySelector("#loopTooltip")

// Time
const currentTime = document.querySelector("#currentTime")
const totalTime = document.querySelector("#totalTime")

// Container
const container = document.querySelector("#video-container")

// Video source
video.src = "/video.mp4"


// Format time
function formatTime(time) {

    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)

    if (seconds < 10) seconds = "0" + seconds

    return `${minutes}:${seconds}`

}

function updateTimeDisplay() {

    if (showRemaining) {
        let remaining = video.duration - video.currentTime
        currentTime.textContent = "-" + formatTime(remaining)
    } else {
        currentTime.textContent = formatTime(video.currentTime)
    }

}

// Metadata loaded
video.addEventListener("loadedmetadata", () => {

    totalTime.textContent = formatTime(video.duration)

})


// Play Pause
playPauseBtn.addEventListener("click", () => {

    if (video.paused) {

        video.play()
        playPauseBtn.classList.replace("fa-play", "fa-pause")
        playTooltip.textContent = "Pause"

    } else {

        video.pause()
        playPauseBtn.classList.replace("fa-pause", "fa-play")
        playTooltip.textContent = "Play"

    }

})


// Update seekbar
let showRemaining = false;

currentTime.addEventListener("click", () => {
    showRemaining = !showRemaining
    updateTimeDisplay()
})

video.addEventListener("timeupdate", () => {

    let percent = (video.currentTime / video.duration) * 100;
    seekbar.value = percent;

    updateTimeDisplay();

});


// Seek
seekbar.addEventListener("input", () => {

    video.currentTime = (seekbar.value / 100) * video.duration

})


// Reset when video ends
video.addEventListener("ended", () => {

    video.currentTime = 0
    seekbar.value = 0

    playPauseBtn.classList.replace("fa-pause", "fa-play")
    playTooltip.textContent = "Play"

    updateTimeDisplay()

})


// Volume slider
volumeSlider.addEventListener("input", () => {

    video.volume = volumeSlider.value

    if (video.volume === 0) {

        volumeIcon.className = "fa-solid fa-volume-xmark"
        volumeTooltip.textContent = "Unmute"

    } else {

        volumeIcon.className = "fa-solid fa-volume-high"
        volumeTooltip.textContent = "Mute"

    }

})


// Mute toggle
volumeIcon.addEventListener("click", () => {

    video.muted = !video.muted

    if (video.muted) {

        volumeIcon.className = "fa-solid fa-volume-xmark"
        volumeTooltip.textContent = "Unmute"

    } else {

        volumeIcon.className = "fa-solid fa-volume-high"
        volumeTooltip.textContent = "Mute"

    }

})


// Playback speed
speedControl.addEventListener("change", () => {

    video.playbackRate = speedControl.value

})


// Loop toggle
loopBtn.addEventListener("click", () => {

    video.loop = !video.loop

    if (video.loop) {

        loopBtn.classList.add("text-red-500")
        loopTooltip.textContent = "Loop On"

    } else {

        loopBtn.classList.remove("text-red-500")
        loopTooltip.textContent = "Loop Off"

    }

})


// Fullscreen
fullScreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        container.requestFullscreen()
        fullScreenBtn.classList.replace("fa-expand", "fa-compress")
        fullscreenTooltip.textContent = "Exit Fullscreen"

    } else {

        document.exitFullscreen()
        fullScreenBtn.classList.replace("fa-compress", "fa-expand")
        fullscreenTooltip.textContent = "Fullscreen"

    }

})