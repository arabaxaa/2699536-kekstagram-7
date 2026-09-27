const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const NAMES = [
  'Артём', 'Ирина', 'Пётр', 'Мария', 'Сергей',
  'Анна', 'Дмитрий', 'Ольга', 'Никита', 'Елена',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Закат на море',
  'Мой кот спит',
  'Прогулка по городу',
  'Утренний кофе',
  'Лесная тропинка',
];

let commentId = 1;

const createComment = () => {
  const messageCount = getRandomInteger(1, 2);
  const messages = [];

  for (let i = 0; i < messageCount; i++) {
    messages.push(getRandomArrayElement(MESSAGES));
  }

  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = (id) => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: comments,
  };
};

const createPhotos = () => {
  const photoList = [];

  for (let i = 1; i <= 25; i++) {
    photoList.push(createPhoto(i));
  }

  return photoList;
};
// eslint-disable-next-line no-unused-vars
const photos = createPhotos();
