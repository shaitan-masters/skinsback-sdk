import {
    TraceConfig
} from "./types";

import fs, { WriteStream } from 'fs';
import path from "path";
import { AxiosResponse } from "axios";
import { getDateString } from "./utils";

export default class Trace {
    private readonly logsPath: string;
    private readonly saveDaysAmount: number;
    private readonly excludeMethods: Array<string>;

    private lastLogName : string;
    private _writeStream : WriteStream | null;

    constructor(config: TraceConfig = {}) {        
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
    get writeStream() : WriteStream {
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

    get todayLogName() : string {
        return getDateString();
    }

    /**
     * Create write-stream to actual log file
     */
    private prepareStream() : WriteStream {
        const path = `${this.logsPath}/${this.todayLogName}.txt`;

        this.prepareLogsFolder();

        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, '');
        }

        if (this._writeStream) {
            this._writeStream.end();
        }

        this.lastLogName = this.todayLogName;

        this._writeStream = fs.createWriteStream(path, {
            flags: 'a'
        });

        return this._writeStream;
    }

    /**
     * Simple create logs folder
     */
    private prepareLogsFolder() {
        try {
            fs.mkdirSync(this.logsPath, { recursive: true });
        }
        catch {
            
        }
    }

    /**
     * Write response to logs
     */
    public writeResponse(response: AxiosResponse, error: boolean = false) {
        const { method, baseURL } = response.config;
        
        // Review: i am not sure, is it good idea to parse each response.config to find exclude methods
        // Maybe prevent logging in axios interceptors?
        const { method: apiMethod } = JSON.parse(response.config.data);
        if (this.excludeMethods.includes(apiMethod)) {
            return;
        }

        const logTxt = 
            `\n${error ? 'ERRORED ' : ''}<${new Date().toLocaleString()}> ${method} ${baseURL}` +
            `\n>>> ${response.config.data}` +
            `\n<<< ${JSON.stringify(response.data || { error: "timeout" })}`;

        this.write(logTxt);
    }

    /**
     * Write to stream
     */
    private write(txt: string) {
        this.writeStream.write(txt);
    }

    private deleteLogs() {
        const now = Date.now();
        const files = fs.readdirSync(this.logsPath);

        files.forEach(async (file) => {
            const filePath = `${this.logsPath}/${file}`;

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return; 
                }

                if (now - stats.ctimeMs > this.saveDaysAmount * 24 * 60 * 60 * 1000) {
                    fs.rmSync(filePath);
                }
            });
        });
    }
}