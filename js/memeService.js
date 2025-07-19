'use strict'

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            font: 'impact',
            align: 'center'
        }
    ]
}

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}


function addLine(lineData = {}) {
    const canvas = document.querySelector('.meme-editor-canvas')

    const newLine = {
        txt: lineData.txt || 'New Line',
        size: lineData.size || 20,
        color: lineData.color || 'white',
        font: lineData.font || 'impact',
        align: lineData.align || 'center',
        x: lineData.x || canvas.width / 2,
        y: lineData.y || canvas.height / 2
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}


function switchLine() {
    if (!gMeme.lines.length) return
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function deleteLine() {
    if (gMeme.lines.length === 0) return

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
}

function getRandomText() {
    const texts = [
        'When you code at 3AM',
        'When you finally understand something:',
        'Learning Python after JS be like:',
        'Learning C after JS be like:'
    ]
    return texts[getRandomInt(0, texts.length)]
}
