"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureBuilder = void 0;
const crypto_1 = require("crypto");
exports.SignatureBuilder = (params, secret_key) => {
    let paramsString = Object.entries(params)
        .sort()
        .reduce((paramsAsString, [key, value]) => {
        if (key === 'sign' || typeof key == 'object')
            return paramsAsString;
        return paramsAsString + key + ':' + value + ';';
    }, '');
    return crypto_1.createHmac('sha1', secret_key).update(paramsString).digest('hex');
};
