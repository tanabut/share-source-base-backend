import moment from 'moment';

export function makeTwoDigits(num: number) {
  return num > 9 ? num : `0${num}`;
}

export function formatMMDDYYYY(date: Date) {
  const day = makeTwoDigits(date.getDate());
  const month = makeTwoDigits(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${month}${day}${year}`;
}

export function getYesterdayDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

export function getLastMonthDate() {
  return moment().subtract(1, 'months').toDate();
}

export function splitDateRangeByMonths(fromDate: Date, toDate: Date) {
  if (moment(toDate).diff(moment(fromDate), 'day') <= 0) {
    return [];
  }

  const monthlyRanges = [];

  const mToDate = moment(toDate);

  let monthFromDate = moment(fromDate);
  let monthToDate = moment(fromDate).add(1, 'month');

  while (mToDate > monthToDate) {
    monthlyRanges.push({
      from: monthFromDate.toDate(),
      to: monthToDate.toDate(),
    });

    monthFromDate = monthFromDate.add(1, 'month');
    monthToDate = monthToDate.add(1, 'month');
  }

  monthlyRanges.push({
    from: monthFromDate.toDate(),
    to: mToDate.toDate(),
  });

  return monthlyRanges;
}

export function formatDateStandard(date: Date) {
  return moment(date).format('DD/MM/YYYY');
}

export function formatDate(date: Date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}

export function getDateRangeString(date1: Date, date2: Date) {
  return `${formatDateStandard(date1)}-${formatDateStandard(date2)}`;
}
