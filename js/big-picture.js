const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENT_TEMPLATE = `
  <li class="social__comment">
    <img
      class="social__picture"
      src="{{avatar}}"
      alt="{{name}}"
      width="35" height="35">
    <p class="social__text">{{message}}</p>
  </li>
`;

const createCommentElement = (comment) => {
  const template = document.createElement('template');
  template.innerHTML = COMMENT_TEMPLATE
    .replace('{{avatar}}', comment.avatar)
    .replace('{{name}}', comment.name)
    .replace('{{message}}', comment.message);
  return template.content.firstElementChild;
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(fragment);
};

function onEscapeKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeyDown);
}

const openBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  renderComments(photo.comments);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeyDown);
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
