"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileOnValidName = exports.getLastDateOfDay = exports.getDate = exports.getDateString = void 0;
const fileNameRegExp = /^([0][1-9]|[1-2][0-9]|[3][0-1])_([0][1-9]|[1-2][0-9]|[3][0-1])_[0-9][0-9][0-9][0-9]\.(json)/g;
const getDateString = () => {
    const currentDate = new Date();
    const dateNumber = currentDate.getDate();
    const monthNumber = currentDate.getMonth() + 1;
    const yearNumber = currentDate.getFullYear();
    const date = dateNumber <= 9 ? `0${dateNumber}` : dateNumber.toString();
    const month = currentDate.getMonth() ? `0${monthNumber}` : monthNumber.toString();
    const year = yearNumber;
    return `${month}_${date}_${year}`;
};
exports.getDateString = getDateString;
const getDate = (fileName) => {
    const [month, day, year] = fileName.replace('.json', '').split('_');
    const date = new Date(`${month}/${day}/${year}`);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
exports.getDate = getDate;
const getLastDateOfDay = (num) => {
    const date = new Date();
    date.setDate(date.getDate() - (num - 1));
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
exports.getLastDateOfDay = getLastDateOfDay;
const checkFileOnValidName = (fileName) => {
    return !!fileName.match(fileNameRegExp);
};
exports.checkFileOnValidName = checkFileOnValidName;
