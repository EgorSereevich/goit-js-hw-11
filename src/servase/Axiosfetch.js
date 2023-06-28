import axios from 'axios';
const HREF_PIX = 'https://pixabay.com/api/';
const KEY_PIX = '37771567-c63b0fa1e82728e8a21c21132';
async function onFetchImages(inputValue, nomberPage) {
  const { data } = await axios.get(
    `${HREF_PIX}?key=${KEY_PIX}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${nomberPage}&per_page=40`
  );

  return data;
}
async function onFetchMoreImages(inputValue, nomberPage) {
  const { data } = await axios.get(
    `${HREF_PIX}?key=${KEY_PIX}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${nomberPage}&per_page=40`
  );

  return data;
}

export { onFetchImages, onFetchMoreImages };
