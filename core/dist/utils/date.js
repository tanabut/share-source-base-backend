"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeString = exports.formatDate = exports.formatDateStandard = exports.splitDateRangeByMonths = exports.getLastMonthDate = exports.getYesterdayDate = exports.formatMMDDYYYY = exports.makeTwoDigits = void 0;
const moment_1 = __importDefault(require("moment"));
function makeTwoDigits(num) {
    return num > 9 ? num : `0${num}`;
}
exports.makeTwoDigits = makeTwoDigits;
function formatMMDDYYYY(date) {
    const day = makeTwoDigits(date.getDate());
    const month = makeTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month}${day}${year}`;
}
exports.formatMMDDYYYY = formatMMDDYYYY;
function getYesterdayDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
}
exports.getYesterdayDate = getYesterdayDate;
function getLastMonthDate() {
    return moment_1.default().subtract(1, 'months').toDate();
}
exports.getLastMonthDate = getLastMonthDate;
function splitDateRangeByMonths(fromDate, toDate) {
    if (moment_1.default(toDate).diff(moment_1.default(fromDate), 'day') <= 0) {
        return [];
    }
    const monthlyRanges = [];
    const mToDate = moment_1.default(toDate);
    let monthFromDate = moment_1.default(fromDate);
    let monthToDate = moment_1.default(fromDate).add(1, 'month');
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
exports.splitDateRangeByMonths = splitDateRangeByMonths;
function formatDateStandard(date) {
    return moment_1.default(date).format('DD/MM/YYYY');
}
exports.formatDateStandard = formatDateStandard;
function formatDate(date, format = 'YYYY-MM-DD') {
    return moment_1.default(date).format(format);
}
exports.formatDate = formatDate;
function getDateRangeString(date1, date2) {
    return `${formatDateStandard(date1)}-${formatDateStandard(date2)}`;
}
exports.getDateRangeString = getDateRangeString;
//# sourceMappingURL=date.js.map