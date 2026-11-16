import { resetEffects } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const body = document.body;

const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.split(' ').filter((tag) => tag !== '');

  if (hashtags.length > 5) {
    return false;
  }

  const lowerCaseTags = [];

  for (const tag of hashtags) {
    if (tag[0] !== '#') {
      return false;
    }
    if (tag.length < 2 || tag.length > 20) {
      return false;
    }
    const tagBody = tag.slice(1);
    if (!/^[a-zA-Zа-яА-Я0-9]+$/.test(tagBody)) {
      return false;
    }
    const lowerTag = tag.toLowerCase();
    if (lowerCaseTags.includes(lowerTag)) {
      return false;
    }
    lowerCaseTags.push(lowerTag);
  }

  return true;
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Ошибка: макс. 5 хэштегов, до 20 символов, только буквы/цифры, без дублей'
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetEffects(); // <-- Добавлено
  document.addEventListener('keydown', onEscapePress);
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetEffects();
  uploadForm.reset();
  uploadInput.value = '';
  pristine.reset();
  document.removeEventListener('keydown', onEscapePress);
};

function onEscapePress(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

uploadInput.addEventListener('change', () => {
  openForm();
});

cancelButton.addEventListener('click', () => {
  closeForm();
});

uploadForm.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

export { uploadForm, pristine };
