import {
    ResponseData,
    ResponseLog,
    ServerErrorData,
    ServerErrorLog,
    TraceConfig
} from "./types";

import fs, {PathLike} from 'fs';
import path from "path";
import {checkFileOnValidName, getDate, getLastDateOfDay, getLogFileName} from "./utils";
import {AxiosResponse} from "axios";

export default class Trace {
    private readonly logsPath: string;
    private config: TraceConfig;
    private readonly excludeMethods: Array<string>;
    private amountOfLastDaysOfSavingLogs: number;
    constructor(config: TraceConfig) {
        this.config = config;
        this.logsPath = this.generateLogsPath(this.config.logsPath || '.');
        this.excludeMethods = [];
        this.amountOfLastDaysOfSavingLogs = 7;

        if (
            typeof this.config.amountOfLastDaysOfSavingLogs === 'number' &&
            this.config.amountOfLastDaysOfSavingLogs > 0
        ) {
            this.amountOfLastDaysOfSavingLogs = this.config.amountOfLastDaysOfSavingLogs;
        }

        if (this.config.excludeMethods instanceof Array) {
            this.excludeMethods = this.config.excludeMethods;
        }
        this.deleteLogs();
    }

    private generateLogsPath = (pathToLogs: string): string => {
        if (!pathToLogs) {
            throw new Error('Config logsPath is not correct');
        }
        // Check if directory is not exists, create directory
        if (!fs.existsSync(pathToLogs)){
            fs.mkdirSync(pathToLogs, { recursive: true });
        }
        return path.resolve(pathToLogs);
    }

    public logResponse = (response: AxiosResponse): void => {
        // Not logged response that includes excluded methods
        const {method} = JSON.parse(response.config.data);
        if (this.excludeMethods.includes(method)) {
            return;
        }
        const data: ResponseData = new ResponseLog(response)
        this.writeLogs(data)
    }

    public logResponseError = (response: AxiosResponse): void => {
        const data: ResponseData = new ResponseLog(response);
        this.writeLogs(data)
    }

    public logError = (error: Error): void => {
        const data: ServerErrorData = new ServerErrorLog(error);
        this.writeLogs(data)
    }

    private writeLogs = async (currentRequest: any): Promise<void> => {
        const fsPromises = fs.promises;
        const filePath: PathLike = await getLogFileName(this.logsPath);
        const data: Array<{[key: string]: any}> = JSON.parse(
            await fsPromises.readFile(filePath, {encoding: "utf8"})
        );
        data.push(currentRequest);
        await fsPromises.writeFile(filePath, JSON.stringify(data));
    }

    private deleteLogs = async () => {
        const currentDay = getLastDateOfDay(this.amountOfLastDaysOfSavingLogs);
        const files = await fs.promises.readdir(this.logsPath)
        for (let file of files) {
            if (!checkFileOnValidName(file)) {
                continue;
            }
            if (currentDay > getDate(file)) {
               await fs.promises.unlink(path.resolve(this.logsPath, file));
            }
        }
    }

}