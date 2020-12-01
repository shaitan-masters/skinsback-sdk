"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureWebSocketsBuilder = exports.SignatureApiBuilder = void 0;
const crypto_1 = require("crypto");
const md5_1 = __importDefault(require("md5"));
const SignatureApiBuilder = (params, secret_key) => {
    let paramsString = Object.entries(params)
        .sort()
        .reduce((paramsAsString, [key, value]) => {
        if (key === 'sign' || typeof key == 'object')
            return paramsAsString;
        return paramsAsString + key + ':' + value + ';';
    }, '');
    return crypto_1.createHmac('sha1', secret_key).update(paramsString).digest('hex');
};
exports.SignatureApiBuilder = SignatureApiBuilder;
const SignatureWebSocketsBuilder = (shop_id, secret_key) => {
    return md5_1.default(shop_id + secret_key);
};
exports.SignatureWebSocketsBuilder = SignatureWebSocketsBuilder;
