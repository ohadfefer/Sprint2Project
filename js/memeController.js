'use strict'

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`

    const canvas = document.querySelector('.meme-editor-canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        meme.lines.forEach((line, idx) => {
            const x = canvas.width / 2
            const y = 50 + idx * 60

            ctx.font = `${line.size}px Impact`
            ctx.fillStyle = line.color
            ctx.textAlign = 'center'
            ctx.fillText(line.txt, x, y)

            // store line position
            const textWidth = ctx.measureText(line.txt).width
            const textHeight = line.size
            line.x = x
            line.y = y
            line.width = textWidth
            line.height = textHeight

            // draw frame if selected
            if (idx === meme.selectedLineIdx) {
                ctx.strokeStyle = 'white'
                ctx.lineWidth = 2
                ctx.strokeRect(x - textWidth / 2 - 10, y - textHeight, textWidth + 20, textHeight + 10)
            }
        })
    }
}



function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}


function onDownloadMeme(elLink) {
    const canvas = document.querySelector('.meme-editor-canvas')
    const dataURL = canvas.toDataURL('image/jpeg')
    elLink.href = dataURL
}


function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    updateInputField()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function updateInputField() {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    document.querySelector('.editor-tools input').value = line.txt
}
