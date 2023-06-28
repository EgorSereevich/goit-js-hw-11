import Notiflix from 'notiflix';
import { refs } from './servase/refs';
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
function onCreateMoreImageCard(images, data, nomberPage) {
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loadMoreEl.classList.add('is-hidden');
  } else if (40 * nomberPage > data) {
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
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
  }
}
export { onCreateMarcup, onCreateMoreImageCard };
