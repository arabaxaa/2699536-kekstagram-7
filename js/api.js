const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/';

const getData = () => fetch(`${BASE_URL}data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    return response.json();
  });

const sendData = (formData) => fetch(BASE_URL, {
  method: 'POST',
  body: formData,
}).then((response) => {
  if (!response.ok) {
    throw new Error('Ошибка отправки данных');
  }
  return response.json();
});

export { getData, sendData };
