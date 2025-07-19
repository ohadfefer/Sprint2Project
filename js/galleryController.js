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

    document.querySelector('.main-nav .gallery-li').classList.remove('active')
    document.querySelector('.main-nav .Randomize-li').classList.remove('active')

    renderMeme()
}


function onSavedInit() {

    document.querySelector('.meme-editor-page').classList.add('hidden')
    document.querySelector('.meme-gallery-page').classList.add('hidden')
    document.querySelector('.meme-saved-page').classList.remove('hidden')

    document.querySelector('.main-nav .gallery-li').classList.remove('active')
    document.querySelector('.main-nav .Randomize-li').classList.remove('active')
    document.querySelector('.main-nav .saved-li').classList.add('active')
}


function onRandomizeInit() {
    const imgId = getRandomInt(1, 19)  

    gMeme.selectedImgId = imgId
    gMeme.lines = [{
        txt: getRandomText(),
        size: 32,
        color: 'white',
        font: 'impact',
        align: 'center',
        x: 300,
        y: 80
    }]
    gMeme.selectedLineIdx = 0

    document.querySelector('.meme-gallery-page').classList.add('hidden')
    document.querySelector('.meme-editor-page').classList.remove('hidden')
    document.querySelector('.main-nav .gallery-li').classList.remove('active')
    document.querySelector('.main-nav .saved-li').classList.remove('active')
    document.querySelector('.main-nav .Randomize-li').classList.add('active')

    renderMeme()

    updateInputField()
}
