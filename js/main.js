import { getData } from './api.js';
import { initGallery } from './gallery.js';
import './form.js';

setTimeout(() => {
  getData()
    .then((photos) => {
      initGallery(photos);
      document.querySelector('#filter-default').click();
    })
    .catch(() => {
      const errorElement = document.createElement('div');
      errorElement.className = 'data-error';
      errorElement.textContent = 'Ошибка загрузки данных';
      errorElement.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; background: red; color: white; text-align: center; padding: 10px; z-index: 9999;';
      document.body.appendChild(errorElement);
    });
}, 2000);
