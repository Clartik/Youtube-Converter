// Buttons
const convertBtn = document.getElementById('convertBtn');
const urlInput = document.getElementById('urlInput');

const videoThumbnail = document.getElementById('videoThumbnail');
const videoTitle = document.getElementById('videoTitle');
const videoBottomDetails = document.getElementById('videoBottomDetails');

const errorText = document.getElementById('errorText');

const loadingCircle = document.createElement('span');
loadingCircle.classList.add('fa');
loadingCircle.classList.add('fa-spinner');
loadingCircle.classList.add('fa-spin');

convertBtn.addEventListener('click', async () => {
    videoTitle.innerText = '';
    videoBottomDetails.innerText = '';
    videoThumbnail.src = '';

    if (urlInput && urlInput.value.length <= 0) {
        errorText.innerHTML = 'Please Enter a URL to Convert';
        return;
    }

    convertBtn.innerText = "";
    convertBtn.appendChild(loadingCircle);

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
    
    convertBtn.innerText = "Convert";
});

urlInput.addEventListener('keydown', () => {
    if (urlInput.value.length <= 0 && errorText.innerHTML.length > 0) {
        errorText.innerHTML = "";
    }
});