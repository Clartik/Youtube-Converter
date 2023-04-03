// Buttons
const convertBtn = document.getElementById('convertBtn');
const urlInput = document.getElementById('urlInput');

const videoThumbnail = document.getElementById('videoThumbnail');
const videoTitle = document.getElementById('videoTitle');

const errorText = document.getElementById('errorText');

const loadingCircle = document.createElement('span');
loadingCircle.classList.add('fa');
loadingCircle.classList.add('fa-spinner');
loadingCircle.classList.add('fa-spin');

convertBtn.addEventListener('click', async () => {
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
        
        console.log(videoInfo);

        videoTitle.innerText = title;
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