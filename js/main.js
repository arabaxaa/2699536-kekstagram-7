import { getData } from './api.js';
import { initGallery } from './gallery.js';
import './form.js';

getData()
  .then((photos) => {
    initGallery(photos);
    document.querySelector('#filter-default').click();
  })
  .catch(() => {
    const errorTemplate = document.querySelector('#error').content.cloneNode(true);
    document.body.appendChild(errorTemplate);
  });
