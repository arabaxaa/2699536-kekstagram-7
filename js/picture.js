import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const createPictureElement = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const imageElement = pictureElement.querySelector('.picture__img');
  const likesElement = pictureElement.querySelector('.picture__likes');
  const commentsElement = pictureElement.querySelector('.picture__comments');

  imageElement.src = photo.url;
  imageElement.alt = photo.description;
  likesElement.textContent = photo.likes;
  commentsElement.textContent = photo.comments.length;

  const linkElement = pictureElement.querySelector('.picture');
  linkElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return pictureElement;
};

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createPictureElement(photo));
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
