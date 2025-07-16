'use strict'


function renderGallery() {
    const elGrid = document.querySelector('.memes-grid-container')
    var strHTML = ''

    for (var i = 1; i <= 18; i++) {
        strHTML += `
            <div class="meme-img-container">
                <img src="img/${i}.jpg" alt="Meme ${i}" onclick="onSelectImg(${i})">
            </div>
        `
    }

    elGrid.innerHTML = strHTML
}


function onSelectImg(imgId) {
    
    gMeme.selectedImgId = imgId
    document.querySelector('.meme-gallery-page').classList.add('hidden')
    document.querySelector('.meme-editor-page').classList.remove('hidden')

    renderMeme()
}

