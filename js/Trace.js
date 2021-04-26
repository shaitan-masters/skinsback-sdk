"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
class Trace {
    constructor(config = {}) {
        this.excludeMethods = config.excludeMethods && Array.isArray(config.excludeMethods) ? config.excludeMethods : [];
        this.saveDaysAmount = config.saveDaysAmount && !isNaN(+config.saveDaysAmount) ? +config.saveDaysAmount : 7;
        this.logsPath = config.logsPath || '/logs';
        this.lastLogName = this.todayLogName;
        this._writeStream = null;
        // Start clean-up each hour
        setInterval(() => this.deleteLogs(), 60 * 60 * 1000);
    }
    /**
     * Getter for writeStream, which can create it, if it not exists
     */
    get writeStream() {
        // If todayLogName was swiched cause of time, re-create stream
        if (this.lastLogName != this.todayLogName) {
            return this.prepareStream();
        }
        // If no write-stream, or stream is not writable, re-create stream too
        if (!this._writeStream || !this._writeStream.writable) {
            return this.prepareStream();
        }
        return this._writeStream;
    }
    get todayLogName() {
        return utils_1.getDateString();
    }
    /**
     * Create write-stream to actual log file
     */
    prepareStream() {
        const path = `${this.logsPath}/${this.todayLogName}.txt`;
        this.prepareLogsFolder();
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.writeFileSync(path, '');
        }
        if (this._writeStream) {
            this._writeStream.end();
        }
        this.lastLogName = this.todayLogName;
        this._writeStream = fs_1.default.createWriteStream(path, {
            flags: 'a'
        });
        return this._writeStream;
    }
    /**
     * Simple create logs folder
     */
    prepareLogsFolder() {
        try {
            fs_1.default.mkdirSync(this.logsPath, { recursive: true });
        }
        catch {
        }
    }
    /**
     * Write response to logs
     */
    writeResponse(response, error = false) {
        const { method, baseURL } = response.config;
        // Review: i am not sure, is it good idea to parse each response.config to find exclude methods
        // Maybe prevent logging in axios interceptors?
        const { method: apiMethod } = JSON.parse(response.config.data);
        if (this.excludeMethods.includes(apiMethod)) {
            return;
        }
        const logTxt = `\n${error ? 'ERRORED ' : ''}<${new Date().toLocaleString()}> ${method} ${baseURL}` +
            `\n>>> ${response.config.data}` +
            `\n<<< ${JSON.stringify(response.data || { error: "timeout" })}`;
        this.write(logTxt);
    }
    /**
     * Write to stream
     */
    write(txt) {
        this.writeStream.write(txt);
    }
    deleteLogs() {
        const now = Date.now();
        const files = fs_1.default.readdirSync(this.logsPath);
        files.forEach(async (file) => {
            const filePath = `${this.logsPath}/${file}`;
            fs_1.default.stat(filePath, (err, stats) => {
                if (err) {
                    return;
                }
                if (now - stats.ctimeMs > this.saveDaysAmount * 24 * 60 * 60 * 1000) {
                    fs_1.default.rmSync(filePath);
                }
            });
        });
    }
}
exports.default = Trace;
