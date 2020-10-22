"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const SignatureGenerator_1 = require("./SignatureGenerator");
const getConnectedURL = ({ shop_id, secret_key }) => {
    const signature = SignatureGenerator_1.SignatureWebSocketsBuilder(shop_id, secret_key);
    return `ws://185.71.65.202:7777/?shopid=${shop_id}&signature=${signature}`;
};
class WebSockets extends ws_1.default {
    constructor(config) {
        super(getConnectedURL(config));
        this.subscribe = (cb) => {
            this.onmessage = event => {
                const data = JSON.parse(event.data);
                cb(data);
            };
        };
        this.connect = (cb) => {
            this.onopen = cb;
        };
        this.disconnect = (cb) => {
            this.onclose = cb;
        };
    }
}
exports.default = WebSockets;
