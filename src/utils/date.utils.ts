const fileNameRegExp: RegExp = /^([0][1-9]|[1-2][0-9]|[3][0-1])_([0][1-9]|[1-2][0-9]|[3][0-1])_[0-9][0-9][0-9][0-9]\.(json)/g;

export const getDateString = (): string =>  {
    const currentDate = new Date();

    const dateNumber = currentDate.getDate();
    const monthNumber = currentDate.getMonth() + 1;
    const yearNumber = currentDate.getFullYear();

    const date = dateNumber <= 9 ? `0${dateNumber}` : dateNumber.toString();
    const month = currentDate.getMonth() ? `0${monthNumber}` : monthNumber.toString();
    const year = yearNumber;

    return `${month}_${date}_${year}`;
}

export const getDate = (fileName: string): Date => {
    const [month, day, year] = fileName.replace('.json', '').split('_');
    const date = new Date(`${month}/${day}/${year}`);

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