import images from './gallery-items.js';

const refGallery = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const btnCloseLightboxRef = document.querySelector(
  '[data-action = "close-lightbox"]'
);
let targetLiRef;

const stringHtml = images.reduce(function (
  acc,
  { preview, original, description }
) {
  return (acc += `<li class="gallery__item">
        <a class = "gallery__link" >
          <img
            class = "gallery__image"
            src = "${preview}"
            data-source = "${original}"
            alt = ${description}
          />
        </a>
      </li>`);
},
'');

refGallery.insertAdjacentHTML('afterBegin', stringHtml);
refGallery.addEventListener('click', onImageClick);
btnCloseLightboxRef.addEventListener('click', onClose);
window.addEventListener('keydown', onKeyPress);
document.body.addEventListener('click', (e) => {
  const { target } = e;
  if (target.classList.contains('lightbox__content')) {
    onClose();
  }
});

function onImageClick({ target }) {
  if (target.nodeName != 'IMG') {
    console.log('no image');
    return;
  }
  const imgSrc = target.dataset.source;
  lightboxRef.classList.add('is-open');
  lightboxImageRef.setAttribute('src', imgSrc);
  targetLiRef = target.closest('.gallery__item');
}

function onClose() {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.setAttribute('src', '');
}

function onKeyPress({ code }) {
  switch (code) {
    case 'Escape':
      onClose();
      break;
    case 'ArrowRight':
      if (!targetLiRef.nextSibling) {
        targetLiRef = targetLiRef.parentNode.firstChild;
      } else {
        targetLiRef = targetLiRef.nextSibling;
      }
      showChangedImages();
      break;
    case 'ArrowLeft':
      if (!targetLiRef.previousSibling) {
        targetLiRef = targetLiRef.parentNode.lastChild;
      } else {
        targetLiRef = targetLiRef.previousSibling;
      }
      showChangedImages();
      break;
  }
}

function showChangedImages() {
  const changingImgRef = targetLiRef.querySelector('.gallery__image');
  const changingImgSrc = changingImgRef.dataset.source;
  lightboxImageRef.setAttribute('src', changingImgSrc);
}
