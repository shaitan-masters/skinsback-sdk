"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bottleneck_1 = __importDefault(require("bottleneck"));
const defaultConfig_1 = require("./defaultConfig");
const bottleneckConfigConstructor = (config) => {
    if (!config) {
        return {
            reservoir: defaultConfig_1.REQUEST_LIMIT,
            reservoirIncreaseInterval: defaultConfig_1.TIME_LIMIT,
        };
    }
    if ('timeLimit' in config && typeof config.timeLimit !== 'number') {
        throw new Error('timeLimit param is required and must be type number');
    }
    if ('requestLimit' in config && typeof config.requestLimit !== 'number') {
        throw new Error('requestLimit param is required and must be type number');
    }
    return {
        reservoir: config.requestLimit || defaultConfig_1.REQUEST_LIMIT,
        reservoirIncreaseInterval: config.timeLimit ? config.timeLimit : defaultConfig_1.TIME_LIMIT,
    };
};
class TraceLimiter extends bottleneck_1.default {
    constructor(config) {
        super(bottleneckConfigConstructor(config));
    }
}
exports.default = TraceLimiter;
