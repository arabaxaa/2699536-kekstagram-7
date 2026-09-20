const checkStringLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

const isPalindrome = (string) => {
  const noSpaces = string.replaceAll(' ', '');

  const normalized = noSpaces.toLowerCase();

  const characters = normalized.split('');

  const reversedArray = characters.reverse();

  const reversed = reversedArray.join('');

  return normalized === reversed;
};

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 10);
checkStringLength('проверяемая строка', 10);
isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
