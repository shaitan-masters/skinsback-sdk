import Bottleneck from 'bottleneck';
import {TraceLimiterConfig} from "./types/traceLimiter";
import {REQUEST_LIMIT, TIME_LIMIT} from "./defaultConfig";

const bottleneckConfigConstructor = (config: TraceLimiterConfig | null) => {
    if (!config) {
        return {
            reservoir: REQUEST_LIMIT,
            reservoirIncreaseInterval: TIME_LIMIT,
        }
    }
    if ('timeLimit' in config && typeof config.timeLimit !== 'number') {
        throw new Error('timeLimit param is required and must be type number')
    }
    if ('requestLimit' in config && typeof config.requestLimit !== 'number') {
        throw new Error('requestLimit param is required and must be type number')
    }

    return {
        reservoir: config.requestLimit || REQUEST_LIMIT,
        reservoirIncreaseInterval: config.timeLimit ? config.timeLimit : TIME_LIMIT,
    }
}

class TraceLimiter extends Bottleneck {
    constructor(config: TraceLimiterConfig | null) {
        super(bottleneckConfigConstructor(config));
    }
}

export default TraceLimiter;