import dayjs from 'dayjs';

export const readableDate = (dateUTC: string) => {
  const processedUTCDate = new Date(dateUTC);
  const todayDate = dayjs(new Date())
  const dayJsDate = dayjs(processedUTCDate);

  const processedUTCTime = dayJsDate.format('HH:mm');
  const timeZone = dayJsDate.format('Z');
  const gmtValue = `i-GMT${timeZone[0]}${parseInt(timeZone.slice(1, 3), 10)}`;

  if (todayDate.format('DD.MM.YYYY') === dayJsDate.format('DD.MM.YYYY')) {
    return `Сегодня, ${processedUTCTime} ${gmtValue}`;
  } else {
    return `${dayJsDate.format('DD.MM.YYYY')} ${processedUTCTime} ${gmtValue}`;
  }
};