import fs from 'fs/promises';
import path from "path";
import {PathLike} from "fs";

const fileNameRegExp: RegExp = /^([0][1-9]|[1-2][0-9]|[3][0-1])_([0][1-9]|[1-2][0-9]|[3][0-1])_[0-9][0-9][0-9][0-9]\.(json)/g;

export const getLogFileName = async (pathToFile: string): Promise<PathLike> => {
    const currentDate = new Date();
    const date = currentDate.getDate() <= 9 ? '0'+currentDate.getDate() : currentDate.getDate();
    const month = currentDate.getMonth()+1 <= 9 ? '0'+(currentDate.getMonth()+1) : (currentDate.getMonth()+1)
    const year = currentDate.getFullYear();

    const fileName = `${month}_${date}_${year}.json`;
    const filePath: PathLike = path.resolve(pathToFile, fileName);
   try {
       const data = await fs.readFile(filePath);
       if (!data.length) {
           await fs.writeFile(filePath, JSON.stringify([]));
       }
       return filePath;
   } catch (e) {
       await fs.writeFile(filePath, JSON.stringify([]));
       return filePath;
   }
}

export const getDate = (fileName: string): Date => {
    const [month, day, year] = fileName.replace('.json', '').split('_');
    const date = new Date(`${month}/${day}/${year}`)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date;
}

export const getLastDateOfDay = (num: number): Date => {
    const date = new Date()
    date.setDate(date.getDate() - (num - 1));
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date;
}

export const checkFileOnValidName = (fileName: string): boolean => {
    return  !!fileName.match(fileNameRegExp);
}