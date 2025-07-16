'use strict'

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`

    const canvas = document.querySelector('.meme-editor-canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Draw text
        const line = meme.lines[meme.selectedLineIdx]
        ctx.font = `${line.size}px Impact`
        ctx.fillStyle = line.color
        ctx.textAlign = 'center'
        ctx.fillText(line.txt, canvas.width / 2, 50)
    }
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

