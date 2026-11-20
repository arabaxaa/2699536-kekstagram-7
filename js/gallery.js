import { renderPictures } from './picture.js';
import { debounce } from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');

let currentPhotos = [];

const getRandomPhotos = (photos) => {
  const shuffled = [...photos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const getDiscussedPhotos = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const clearPictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const updateGallery = (filter) => {
  clearPictures();

  let filteredPhotos = currentPhotos;

  if (filter === 'random') {
    filteredPhotos = getRandomPhotos(currentPhotos);
  } else if (filter === 'discussed') {
    filteredPhotos = getDiscussedPhotos(currentPhotos);
  }

  renderPictures(filteredPhotos);
};

const debouncedUpdate = debounce((filter) => {
  updateGallery(filter);
});

const setActiveFilter = (activeButton, inactiveButton1, inactiveButton2) => {
  activeButton.classList.add('img-filters__button--active');
  inactiveButton1.classList.remove('img-filters__button--active');
  inactiveButton2.classList.remove('img-filters__button--active');
};

filterDefault.addEventListener('click', () => {
  setActiveFilter(filterDefault, filterRandom, filterDiscussed);
  debouncedUpdate('default');
});

filterRandom.addEventListener('click', () => {
  setActiveFilter(filterRandom, filterDefault, filterDiscussed);
  debouncedUpdate('random');
});

filterDiscussed.addEventListener('click', () => {
  setActiveFilter(filterDiscussed, filterDefault, filterRandom);
  debouncedUpdate('discussed');
});

const initGallery = (photos) => {
  currentPhotos = photos;
  filtersContainer.classList.remove('img-filters--inactive');
};

export { initGallery };
