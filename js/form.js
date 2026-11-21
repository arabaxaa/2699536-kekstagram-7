import { resetEffects } from './effects.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const body = document.body;

const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

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
  resetEffects();

  const file = uploadInput.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    previewImage.src = imageUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });
  }

  document.addEventListener('keydown', onEscapePress);
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetEffects();
  uploadForm.reset();
  uploadInput.value = '';
  pristine.reset();

  previewImage.src = 'img/upload-default-image.jpg';

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  document.removeEventListener('keydown', onEscapePress);
};

function onEscapePress(evt) {
  if (evt.key === 'Escape') {
    const errorModal = document.querySelector('.error');
    if (errorModal) {
      return;
    }

    const hasErrors = uploadForm.querySelector('.pristine-error');

    if (uploadForm.contains(document.activeElement) && !hasErrors) {
      evt.stopPropagation();
      return;
    }

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
    //
  }
});

const submitButton = uploadForm.querySelector('.img-upload__submit');

function onSuccessEsc(e) {
  if (e.key === 'Escape') {
    onSuccessClose();
  }
}

function onSuccessClick(e) {
  if (!e.target.closest('.success')) {
    onSuccessClose();
  }
}

function onSuccessClose() {
  const successElement = document.querySelector('.success');
  if (successElement) {
    successElement.remove();
  }
  document.removeEventListener('keydown', onSuccessEsc);
  document.removeEventListener('click', onSuccessClick);
}

function onErrorEsc(e) {
  if (e.key === 'Escape') {
    onErrorClose();
  }
}

function onErrorClick(e) {
  if (!e.target.closest('.error')) {
    onErrorClose();
  }
}

function onErrorClose() {
  const errorElement = document.querySelector('.error');
  if (errorElement) {
    errorElement.remove();
  }
  document.removeEventListener('keydown', onErrorEsc);
  document.removeEventListener('click', onErrorClick);
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;
    const formData = new FormData(uploadForm);

    sendData(formData)
      .then(() => {
        closeForm();

        const successTemplate = document.querySelector('#success').content.cloneNode(true);
        const successElement = successTemplate.firstElementChild;
        successElement.style.position = 'fixed';
        successElement.style.zIndex = '9999';
        successElement.style.top = '0';
        successElement.style.left = '0';
        successElement.style.width = '100%';
        document.body.appendChild(successElement);

        successElement.querySelector('.success__button').addEventListener('click', onSuccessClose);
        document.addEventListener('keydown', onSuccessEsc);
        document.addEventListener('click', onSuccessClick);
      })
      .catch(() => {
        const errorTemplate = document.querySelector('#error').content.cloneNode(true);
        const errorElement = errorTemplate.firstElementChild;
        errorElement.style.position = 'fixed';
        errorElement.style.zIndex = '9999';
        errorElement.style.top = '0';
        errorElement.style.left = '0';
        errorElement.style.width = '100%';
        document.body.appendChild(errorElement);

        errorElement.querySelector('.error__button').addEventListener('click', onErrorClose);
        document.addEventListener('keydown', onErrorEsc);
        document.addEventListener('click', onErrorClick);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});

export { uploadForm, pristine };
