'use strict'


var gElCanvas
var gCtx
var gIsDragging = false
var gDragOffset = { x: 0, y: 0 }


function onInit() {

  gElCanvas = document.querySelector('.meme-editor-canvas')
  gCtx = gElCanvas.getContext('2d')

  renderGallery()
  const canvas = document.querySelector('.meme-editor-canvas')
  canvas.addEventListener('click', onCanvasClick)
  canvas.addEventListener('mousedown', onStartDrag)
  canvas.addEventListener('mousemove', onDrag)
  canvas.addEventListener('mouseup', onEndDrag)
  canvas.addEventListener('mouseleave', onEndDrag)



  /* show and hide page */

  document.querySelector('.meme-editor-page').classList.add('hidden')
  document.querySelector('.meme-saved-page').classList.add('hidden')
  document.querySelector('.meme-gallery-page').classList.remove('hidden')

  /* add 'active' class when btns in main header are clicked */

  document.querySelector('.main-nav .gallery-li').classList.add('active')
  document.querySelector('.main-nav .saved-li').classList.remove('active')
  document.querySelector('.main-nav .Randomize-li').classList.remove('active')
}

function onToggleMenu() {
  const elSideNav = document.querySelector('.side-nav')
  elSideNav.classList.toggle('hidden')

  document.body.classList.toggle('menu-open')
}


function onToggleMode(mode) {
  const elBody = document.body

  if (mode === 'light') {
  elBody.classList.add('light-mode')
  } else {
  elBody.classList.remove('light-mode')
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
