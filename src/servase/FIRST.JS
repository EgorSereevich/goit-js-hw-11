let nomberPage = 0;

refs.formEl.addEventListener('submit', onSearchImage);
function onSearchImage(evt) {
  evt.preventDefault();
  nomberPage = 1;

  const inputValue = refs.inputEl.value;
  fetchImage(inputValue)
    .then(images => renderImagesCard(images.hits, images.totalHits))
    .catch(error => console.log(error));
}
function fetchImage(inputValue) {
  return fetch(
    `${HREF_PIX}?key=${KEY_PIX}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${nomberPage}&per_page=40`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
function renderImagesCard(images, totalHits) {
  console.log(images, totalHits);
  refs.cardEl.innerHTML = '';
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  const renderImage = images
    .map(
      image => `<a href="${image.largeImageURL}"><div class="photo-card">
      
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
  refs.cardEl.innerHTML += renderImage;
  refs.loadMoreEl.classList.remove('is-hidden');
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

refs.loadMoreEl.addEventListener(`click`, onLoadMore);
function onLoadMore(evt) {
  evt.preventDefault();
  const inputValue = refs.inputEl.value;
  fetchMoreCard(inputValue)
    .then(images => renderMoreImagesCard(images.hits, images.totalHits))
    .catch(error => console.log(error));
}

function fetchMoreCard(inputValue) {
  nomberPage += 1;
  console.log(nomberPage);
  return fetch(
    `${HREF_PIX}?key=${KEY_PIX}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${nomberPage}&per_page=40`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
function renderMoreImagesCard(images) {
  //  refs.cardEl.innerHTML = '';
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  // } else if (nomberPage > images.totalHits / 40) {
  //   refs.loadMoreEl.classList.add('is-hidden');
  //   Notiflix.Notify.failure(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  // }

  const renderImage = images
    .map(
      image => `<a href=""><div class="photo-card">
      
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
  refs.cardEl.innerHTML += renderImage;
}
