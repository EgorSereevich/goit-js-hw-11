import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
var gallariBox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('input'),
  buttonEl: document.querySelector('button'),
  cardEl: document.querySelector('.gallery'),
  loadMoreEl: document.querySelector('.load-more'),
};

const HREF_PIX = 'https://pixabay.com/api/';
const KEY_PIX = '37771567-c63b0fa1e82728e8a21c21132';
let nomberPage = 0;
refs.formEl.addEventListener('submit', onMarcupImagesCard);
function onMarcupImagesCard(evt) {
  evt.preventDefault();
  refs.cardEl.innerHTML = '';
  nomberPage = 1;
  const inputValue = refs.inputEl.value;
  refs.loadMoreEl.classList.add('is-hidden');
  onFetchImages(inputValue, nomberPage).then(data =>
    onCreateMarcup(data.hits, data.totalHits)
  );
}
async function onFetchImages(inputValue, nomberPage) {
  const { data } = await axios.get(
    `${HREF_PIX}?key=${KEY_PIX}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${nomberPage}&per_page=40`
  );

  return data;
}
function onCreateMarcup(images, data) {
  console.log(images);
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loadMoreEl.classList.add('is-hidden');
  } else {
    const createCard = images
      .map(
        image => `<a href="${image.largeImageURL}" class="gallery__link"><div class="photo-card">

  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery__image" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>
  </div>
</div></a>`
      )
      .join('');
    refs.cardEl.innerHTML += createCard;
    refs.loadMoreEl.classList.remove('is-hidden');
    Notiflix.Notify.success(`Hooray! We found ${data} images.`);
  }
}
refs.loadMoreEl.addEventListener('click', onCreateMoreImages);
function onCreateMoreImages() {
  nomberPage += 1;
  console.log(nomberPage);
  const inputValue = refs.inputEl.value;
  onFetchMoreImages(inputValue, nomberPage).then(data =>
    onCreateMoreImageCard(data.hits, data.totalHits, nomberPage)
  );
}
async function onFetchMoreImages(inputValue, nomberPage) {
  const { data } = await axios.get(
    `${HREF_PIX}?key=${KEY_PIX}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${nomberPage}&per_page=40`
  );

  return data;
}
function onCreateMoreImageCard(images, data, nomberPage) {
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loadMoreEl.classList.add('is-hidden');
  } else if (images.lengtsh * nomberPage > data) {
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  } else {
    const createCard = images
      .map(
        image => `<a href="${image.largeImageURL}" class="gallery__link"><div class="photo-card">

  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery__image" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>
  </div>
</div></a>`
      )
      .join('');
    refs.cardEl.innerHTML += createCard;
  }
}
