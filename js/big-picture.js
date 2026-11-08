const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
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

const COMMENTS_PORTION = 5;

let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = (comment) => {
  const template = document.createElement('template');
  template.innerHTML = COMMENT_TEMPLATE
    .replace('{{avatar}}', comment.avatar)
    .replace('{{name}}', comment.name)
    .replace('{{message}}', comment.message);
  return template.content.firstElementChild;
};

const updateCommentCounter = () => {
  commentCountBlock.innerHTML = `${shownCommentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;
};

const renderCommentsPortion = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PORTION);

  nextComments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(fragment);
  shownCommentsCount += nextComments.length;

  updateCommentCounter();

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onLoadMoreClick = () => {
  renderCommentsPortion();
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
  commentsLoader.removeEventListener('click', onLoadMoreClick);
}

const openBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  currentComments = photo.comments;
  shownCommentsCount = 0;
  socialComments.innerHTML = '';

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  if (currentComments.length === 0) {
    commentsLoader.classList.add('hidden');
    updateCommentCounter();
  } else {
    renderCommentsPortion();
  }

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeyDown);
  commentsLoader.addEventListener('click', onLoadMoreClick);
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
