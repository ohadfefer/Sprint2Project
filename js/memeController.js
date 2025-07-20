'use strict'

const canvas = document.querySelector('.meme-editor-canvas')

function renderMeme({ shouldDrawFrame = true, onRenderDone } = {}) {
    const meme = getMeme()
    const img = new Image()
    img.src = meme.uploadedImg ? meme.uploadedImg.src : `img/${meme.selectedImgId}.jpg`

    
    const ctx = canvas.getContext('2d')

    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        meme.lines.forEach((line, idx) => {
            ctx.font = `${line.size}px ${line.font || 'impact'}`
            ctx.fillStyle = line.color || 'white'
            ctx.textAlign = line.align || 'center'

            if (line.x === undefined) line.x = canvas.width / 2
            if (line.y === undefined) line.y = 60 + idx * 60

            ctx.fillText(line.txt, line.x, line.y)

            const textWidth = ctx.measureText(line.txt).width
            line.width = textWidth
            line.height = line.size

            if (shouldDrawFrame && idx === meme.selectedLineIdx) {
                let boxX = line.x
                if (line.align === 'center') boxX = line.x - textWidth / 2
                if (line.align === 'right') boxX = line.x - textWidth

                ctx.strokeStyle = 'white'
                ctx.lineWidth = 2
                ctx.strokeRect(boxX - 10, line.y - line.height, textWidth + 20, line.height + 10)
            }
        })

        if (typeof onRenderDone === 'function') onRenderDone()
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


function onDownloadMeme() {
    renderMeme({
        shouldDrawFrame: false,
        onRenderDone: () => {
            const imgContent = canvas.toDataURL('image/jpeg')

            const tempLink = document.createElement('a')
            tempLink.href = imgContent
            tempLink.download = `meme-${Date.now()}.jpg`
            document.body.appendChild(tempLink)
            tempLink.click()
            document.body.removeChild(tempLink)

            renderMeme()
        }
    })
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

function onAddSticker(stickerTxt) {
    addLine({
        txt: stickerTxt,
        size: 40,
        color: 'white',
        font: 'arial',
        align: 'center'
    })
    renderMeme()
}


function onStartDrag(ev) {
    const { offsetX, offsetY } = ev
    const lineIdx = getLineClicked(offsetX, offsetY)
    if (lineIdx !== -1) {
        const line = getMeme().lines[lineIdx]
        gIsDragging = true
        getMeme().selectedLineIdx = lineIdx
        gDragOffset = {
            x: offsetX - line.x,
            y: offsetY - line.y
        }
        updateInputField()
        renderMeme()
    }
}

function onDrag(ev) {
    if (!gIsDragging) return
    const { offsetX, offsetY } = ev
    const line = getMeme().lines[getMeme().selectedLineIdx]
    line.x = offsetX - gDragOffset.x
    line.y = offsetY - gDragOffset.y
    renderMeme()
}

function onEndDrag() {
    gIsDragging = false
}

function getLineClicked(x, y) {
    const meme = getMeme()
    for (let i = meme.lines.length - 1; i >= 0; i--) {
        const line = meme.lines[i]
        const xStart = line.x - line.width / 2 - 10
        const xEnd = line.x + line.width / 2 + 10
        const yStart = line.y - line.height
        const yEnd = line.y + 10
        if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) {
            return i
        }
    }
    return -1
}

function onShareMeme(elBtn) {
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    uploadImg(canvasData, (uploadedImgUrl) => {
        const encodedUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <p>Image URL: <a href="${uploadedImgUrl}" target="_blank">${uploadedImgUrl}</a></p>
            <button class="btn-facebook" onclick="onUploadToFB('${encodedUrl}')">
                Share on Facebook
            </button>
        `
    })
}

function onUploadToFB(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}


function onSaveMeme() {
    renderMeme({
        shouldDrawFrame: false,
        onRenderDone: () => {
            const memeImg = canvas.toDataURL('image/jpeg')
            const savedMemes = loadFromStorage('savedMemes') || []

            const savedMeme = {
                id: Date.now(),
                imgDataUrl: memeImg,
                memeData: JSON.parse(JSON.stringify(getMeme()))
            }

            savedMemes.push(savedMeme)
            saveToStorage('savedMemes', savedMemes)

            renderMeme() 
            alert('Meme saved!')
        }
    })
}



