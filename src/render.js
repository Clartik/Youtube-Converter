// Buttons
const loadBtn = document.getElementById('loadBtn');
const urlInput = document.getElementById('urlInput');

const videoThumbnail = document.getElementById('videoThumbnail');
const videoTitle = document.getElementById('videoTitle');
const videoBottomDetails = document.getElementById('videoBottomDetails');

const convertDiv = document.getElementById('convertDiv');
const convertBtn = document.getElementById('convertBtn');
const convertSelect = document.getElementById('convertSelect');

const errorText = document.getElementById('errorText');

const loadingCircle = document.createElement('span');
loadingCircle.classList.add('fa');
loadingCircle.classList.add('fa-spinner');
loadingCircle.classList.add('fa-spin');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

loadBtn.addEventListener('click', async () => {
    videoTitle.innerText = '';
    videoBottomDetails.innerText = '';
    videoThumbnail.src = '';

    if (urlInput && urlInput.value.length <= 0) {
        errorText.innerHTML = 'Please Enter a URL to Convert';
        return;
    }

    loadBtn.innerText = "";
    loadBtn.appendChild(loadingCircle);

    try {
        const videoInfo = await window.api.getBasicInfo(urlInput.value);
        const videoDetails = videoInfo['videoDetails'];

        const title = videoDetails['title'];
        const thumbnail = videoDetails['thumbnails'].at(-1)['url'];
        let duration = videoDetails['lengthSeconds'];
        const channel = videoDetails['ownerChannelName'];

        let hours = Math.floor(duration / 3600);
        let mins = Math.floor(duration % 3600 / 60);
        let secs = Math.floor(duration % 3600 % 60);

        duration = '';

        if (hours > 0) {
            duration += `${hours}:`;
        }
        
        duration += `${mins}:${secs}`;
        
        console.log(videoInfo);

        videoTitle.innerText = title;
        videoBottomDetails.innerText = channel + ' • ' + duration;

        videoThumbnail.src = thumbnail;
    }
    catch {
        errorText.innerHTML = "Invalid URL!";
    }
    
    loadBtn.innerText = "Load";
    convertDiv.style.visibility = "visible";
});

convertBtn.addEventListener('click', () => {
    errorText.innerHTML = ""

    if (convertSelect.selectedIndex == 0) {
        errorText.innerHTML = "Select a Type to Convert!"
        return;
    }

    convertBtn.innerText = "";
    convertBtn.appendChild(loadingCircle);

    sleep(500).then(() => {
        console.log("Convert Button Clicked!");
        convertBtn.innerText = "Convert";
    });
});

urlInput.addEventListener('keydown', () => {
    if (urlInput.value.length <= 0 && errorText.innerHTML.length > 0) {
        errorText.innerHTML = "";
    }
});