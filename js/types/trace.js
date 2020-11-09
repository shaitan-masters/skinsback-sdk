"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseLog = exports.ServerErrorLog = void 0;
class ServerErrorLog {
    constructor(error) {
        this.status = 'Server_Error';
        this.responseTime = new Date().toISOString();
        this.error = error;
    }
}
exports.ServerErrorLog = ServerErrorLog;
class ResponseLog {
    constructor(response) {
        this.status = this.getStatus(response);
        this.responseTime = new Date().toISOString();
        this.url = response.config.baseURL || '';
        this.method = JSON.parse(response.config.data).method;
        this.requestData = JSON.parse(response.config.data);
        this.responseData = response.data;
    }
    getStatus(response) {
        if (response.data.status === 'success') {
            return 'Success';
        }
        return 'Response_Error';
    }
}
exports.ResponseLog = ResponseLog;
