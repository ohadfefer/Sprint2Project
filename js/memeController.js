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
            const x = getXFromAlign(line.align, canvas)
            const y = 50 + idx * 60

            ctx.font = `${line.size}px ${line.font}`
            ctx.fillStyle = line.color
            ctx.textAlign = line.align
            ctx.fillText(line.txt, x, y)

            // Save position for click detection
            const textWidth = ctx.measureText(line.txt).width
            line.x = x
            line.y = y
            line.width = textWidth
            line.height = line.size

            // Draw box if selected
            if (idx === meme.selectedLineIdx) {
                ctx.strokeStyle = 'white'
                ctx.lineWidth = 2

                const boxX = line.align === 'left' ? x :
                             line.align === 'center' ? x - textWidth / 2 :
                             x - textWidth

                ctx.strokeRect(boxX - 10, y - line.height, textWidth + 20, line.height + 10)
            }
        })
    }
}

function getXFromAlign(align, canvas) {
    if (align === 'left') return 10
    if (align === 'center') return canvas.width / 2
    if (align === 'right') return canvas.width - 10
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
    updateInputField()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    updateInputField()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    updateInputField()
    renderMeme()
}

function updateInputField() {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    document.querySelector('.editor-tools input').value = line.txt
}


function onCanvasClick(ev) {
    const canvas = document.querySelector('.meme-editor-canvas')
    const rect = canvas.getBoundingClientRect()
    const clickX = ev.clientX - rect.left
    const clickY = ev.clientY - rect.top

    const meme = getMeme()
    for (let i = 0; i < meme.lines.length; i++) {
        const line = meme.lines[i]
        if (!line) continue

        const xStart = line.x - line.width / 2 - 10
        const xEnd = line.x + line.width / 2 + 10
        const yStart = line.y - line.height
        const yEnd = line.y + 10

        if (clickX >= xStart && clickX <= xEnd && clickY >= yStart && clickY <= yEnd) {
            meme.selectedLineIdx = i
            updateInputField()
            renderMeme()
            break
        }
    }
}

function onUpdateFontSize(diff) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    line.size = Math.max(10, line.size + diff)
    renderMeme()
}

function onSetAlign(align) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = align
    renderMeme()
}

function onSetFont(elSelect) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = elSelect.value
    renderMeme()
}

function onSetFillColor(elColorInput) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = elColorInput.value
    renderMeme()
}

