"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const types_1 = require("./types");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
class Trace {
    constructor(config) {
        this.generateLogsPath = (pathToLogs) => {
            if (!pathToLogs) {
                throw new Error('Config logsPath is not correct');
            }
            // Check if directory is not exists, create directory
            if (!fs_1.default.existsSync(pathToLogs)) {
                fs_1.default.mkdirSync(pathToLogs, { recursive: true });
            }
            return path_1.default.resolve(pathToLogs);
        };
        this.logResponse = (response) => {
            // Not logged response that includes excluded methods
            const { method } = JSON.parse(response.config.data);
            if (this.excludeMethods.includes(method)) {
                return;
            }
            const data = new types_1.ResponseLog(response);
            this.writeLogs(data);
        };
        this.logResponseError = (response) => {
            const data = new types_1.ResponseLog(response);
            this.writeLogs(data);
        };
        this.logError = (error) => {
            const data = new types_1.ServerErrorLog(error);
            this.writeLogs(data);
        };
        this.writeLogs = async (currentRequest) => {
            const fsPromises = fs_1.default.promises;
            const filePath = await utils_1.getLogFileName(this.logsPath);
            const data = JSON.parse(await fsPromises.readFile(filePath, { encoding: "utf8" }));
            data.push(currentRequest);
            await fsPromises.writeFile(filePath, JSON.stringify(data));
        };
        this.deleteLogs = async () => {
            const currentDay = utils_1.getLastDateOfDay(this.amountOfLastDaysOfSavingLogs);
            const files = await fs_1.default.promises.readdir(this.logsPath);
            for (let file of files) {
                if (!utils_1.checkFileOnValidName(file)) {
                    continue;
                }
                if (currentDay > utils_1.getDate(file)) {
                    await fs_1.default.promises.unlink(path_1.default.resolve(this.logsPath, file));
                }
            }
        };
        this.config = config;
        this.logsPath = this.generateLogsPath(this.config.logsPath || '.');
        this.excludeMethods = [];
        this.amountOfLastDaysOfSavingLogs = 7;
        if (typeof this.config.amountOfLastDaysOfSavingLogs === 'number' &&
            this.config.amountOfLastDaysOfSavingLogs > 0) {
            this.amountOfLastDaysOfSavingLogs = this.config.amountOfLastDaysOfSavingLogs;
        }
        if (this.config.excludeMethods instanceof Array) {
            this.excludeMethods = this.config.excludeMethods;
        }
        this.deleteLogs();
    }
}
exports.default = Trace;
