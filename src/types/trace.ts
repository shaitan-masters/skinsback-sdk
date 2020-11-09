import {API_METHODS, Params} from "./api";
import {AxiosResponse} from "axios";

export interface TraceConfig {
    logsPath?: string;
    excludeMethods?: string[],
    amountOfLastDaysOfSavingLogs?: number
}

export type LogStatus = 'Response_Error' | 'Success';

export interface ResponseData {
    status: LogStatus;
    responseTime: string;
    url: string
    method: API_METHODS
    requestData: Params;
    responseData: any;
}

export interface ServerErrorData {
    status: string;
    responseTime: string;
    error: Error;
}

export class ServerErrorLog implements ServerErrorData {
    status: string;
    responseTime: string;
    error: Error;
    constructor(error: Error) {
        this.status = 'Server_Error';
        this.responseTime = new Date().toISOString();
        this.error = error;
    }
}

export class ResponseLog implements ResponseData {
    status: LogStatus;
    responseTime: string;
    url: string
    method: API_METHODS;
    requestData: Params;
    responseData: any;
    constructor(response: AxiosResponse) {
        this.status = ResponseLog.getStatus(response);
        this.responseTime = new Date().toISOString();
        this.url = response.config.baseURL || '';
        this.method = JSON.parse(response.config.data).method;
        this.requestData = JSON.parse(response.config.data);
        this.responseData = response.data;
    }

    static getStatus(response: AxiosResponse): LogStatus{
        if (response.data.status === 'success') {
            return 'Success';
        }
        return 'Response_Error';
    }
}