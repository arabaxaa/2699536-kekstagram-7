const uploadForm = document.querySelector('.img-upload__form');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const effectValue = uploadForm.querySelector('.effect-level__value');
const effectsRadios = uploadForm.querySelectorAll('.effects__radio');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
let currentScale = 100;

const updateScale = (value) => {
  currentScale = value;
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
};

scaleSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    updateScale(currentScale - SCALE_STEP);
  }
});

scaleBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    updateScale(currentScale + SCALE_STEP);
  }
});

const EFFECTS = {
  none: { min: 0, max: 100, step: 1, filter: 'none', unit: '' },
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness', unit: '' },
};

let currentEffect = 'none';

noUiSlider.create(effectSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

const updateSliderOptions = (effectName) => {
  const effect = EFFECTS[effectName];

  if (effectName === 'none') {
    effectLevel.classList.add('hidden');
    effectSlider.style.display = 'none';
    previewImage.style.filter = 'none';
    effectValue.value = 100;
    return;
  }

  effectLevel.classList.remove('hidden');
  effectSlider.style.display = 'block';

  effectSlider.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.max,
    step: effect.step,
  });

  effectSlider.noUiSlider.set(effect.max);

  if (effectName === 'marvin') {
    previewImage.style.filter = `invert(${effect.max}%)`;
  } else if (effectName === 'phobos') {
    previewImage.style.filter = `blur(${effect.max}px)`;
  } else {
    previewImage.style.filter = `${effect.filter}(${effect.max}${effect.unit})`;
  }
};

effectSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    return;
  }

  effectValue.value = parseFloat(value);

  if (currentEffect === 'marvin') {
    previewImage.style.filter = `invert(${value}%)`;
  } else if (currentEffect === 'phobos') {
    previewImage.style.filter = `blur(${value}px)`;
  } else {
    previewImage.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
});

effectsRadios.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    updateSliderOptions(currentEffect);
  });
});

export const resetEffects = () => {
  updateScale(100);
  currentEffect = 'none';
  document.querySelector('#effect-none').checked = true;
  updateSliderOptions('none');
};
