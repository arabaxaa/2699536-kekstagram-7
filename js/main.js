import { getData } from './api.js';
import { renderPictures } from './picture.js';
import './form.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    const filters = document.querySelector('.img-filters');
    if (filters) {
      filters.classList.remove('img-filters--inactive');
    }
  })
  .catch(() => {
    const errorTemplate = document.querySelector('#error').content.cloneNode(true);
    document.body.appendChild(errorTemplate);
  });
