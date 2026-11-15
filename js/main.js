import './form.js';
import { createPhotos } from './data.js';
import { renderPictures } from './picture.js';

const photos = createPhotos();

renderPictures(photos);
