'use strict'


function onInit() {
    renderGallery()
    const canvas = document.querySelector('.meme-editor-canvas')
    canvas.addEventListener('click', onCanvasClick)

    document.querySelector('.meme-editor-page').classList.add('hidden')
    document.querySelector('.meme-gallery-page').classList.remove('hidden')
}

function onToggleMenu() {
  const elSideNav = document.querySelector('.side-nav')
  elSideNav.classList.toggle('hidden')

  document.body.classList.toggle('menu-open')
}


