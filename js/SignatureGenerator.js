"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureWebSocketsBuilder = exports.SignatureApiBuilder = void 0;
const md5_1 = __importDefault(require("md5"));
const crypto_1 = require("crypto");
const SignatureApiBuilder = (params, secret_key) => {
    let paramsString = "";
    for (const [key, value] of Object.entries(params).sort()) {
        if (key === "sign") {
            continue;
        }
        if (typeof value === "object") {
            continue;
        }
        paramsString += key + ":" + value + ";";
    }
    return crypto_1.createHmac("sha1", secret_key).update(paramsString).digest("hex");
};
exports.SignatureApiBuilder = SignatureApiBuilder;
const SignatureWebSocketsBuilder = (shop_id, secret_key) => {
    return md5_1.default(shop_id + secret_key);
};
exports.SignatureWebSocketsBuilder = SignatureWebSocketsBuilder;
