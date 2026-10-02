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

const getMinutesFromTime = (time) => {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
};

const checkMeeting = (startWorkDay, endWorkDay, startMeeting, duration) => {
  const startWorkMinutes = getMinutesFromTime(startWorkDay);
  const endWorkMinutes = getMinutesFromTime(endWorkDay);
  const startMeetingMinutes = getMinutesFromTime(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};

checkMeeting('08:00', '17:30', '14:00', 90);
checkMeeting('8:0', '10:0', '8:0', 120);
checkMeeting('08:00', '14:30', '14:00', 90);
checkMeeting('14:00', '17:30', '08:0', 90);
checkMeeting('8:00', '17:30', '08:00', 900);
