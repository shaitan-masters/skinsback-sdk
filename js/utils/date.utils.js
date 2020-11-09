"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileOnValidName = exports.getLastDateOfDay = exports.getDate = exports.getLogFileName = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const fileNameRegExp = /^([0][1-9]|[1-2][0-9]|[3][0-1])_([0][1-9]|[1-2][0-9]|[3][0-1])_[0-9][0-9][0-9][0-9]\.(json)/g;
exports.getLogFileName = async (pathToFile) => {
    const currentDate = new Date();
    const date = currentDate.getDate() <= 9 ? '0' + currentDate.getDate() : currentDate.getDate();
    const month = currentDate.getMonth() + 1 <= 9 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const fileName = `${month}_${date}_${year}.json`;
    const filePath = path_1.default.resolve(pathToFile, fileName);
    try {
        const data = await promises_1.default.readFile(filePath);
        if (!data.length) {
            await promises_1.default.writeFile(filePath, JSON.stringify([]));
        }
        return filePath;
    }
    catch (e) {
        await promises_1.default.writeFile(filePath, JSON.stringify([]));
        return filePath;
    }
};
exports.getDate = (fileName) => {
    const [month, day, year] = fileName.replace('.json', '').split('_');
    const date = new Date(`${month}/${day}/${year}`);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
exports.getLastDateOfDay = (num) => {
    const date = new Date();
    date.setDate(date.getDate() - (num - 1));
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
exports.checkFileOnValidName = (fileName) => {
    return !!fileName.match(fileNameRegExp);
};
