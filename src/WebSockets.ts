import WS from 'ws';
import {WebSocketConfig} from './types';


class WebSockets extends WS {
    constructor(config: WebSocketConfig) {
        super(`ws://185.71.65.202:7777/?shopid=${config.shop_id}&signature=${config.secret_key}`);
    }

    public subscribe = (cb: (data: any) => void) => {
        this.onmessage = cb;
    }
}

export default WebSockets;

