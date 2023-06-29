import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './servase/refs';
import { onFetchImages, onFetchMoreImages } from './servase/Axiosfetch';
import { onCreateMarcup, onCreateMoreImageCard } from './createmarcupImage';
var gallariBox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

let nomberPage = 0;
refs.formEl.addEventListener('submit', onMarcupImagesCard);
function onMarcupImagesCard(evt) {
  evt.preventDefault();
  refs.cardEl.innerHTML = '';
  nomberPage = 1;
  const inputValue = refs.inputEl.value;
  refs.loadMoreEl.classList.add('is-hidden');
  onFetchImages(inputValue, nomberPage).then(data => {
    onCreateMarcup(data.hits, data.totalHits);
    gallariBox.refresh()
  }
    
  );
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
