const dayjs = require('dayjs');

export const dateFormat = (startDate, endDate) => {
  const start = dayjs(startDate).format('MMM D');
  let end;
  if (endDate) {
    end =
      dayjs(startDate).format('D') !== dayjs(endDate).format('D')
        ? dayjs(endDate).format(' - D')
        : '';
  } else {
    end = '';
  }
  const year = dayjs(startDate).format(', YYYY');

  return start + end + year;
};
