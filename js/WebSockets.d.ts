import WS from 'ws';
import { SubscribeCallback, WebSocketConfig } from './types';
declare class WebSockets extends WS {
    constructor(config: WebSocketConfig);
    subscribe: (cb: SubscribeCallback) => void;
    connect: (cb: () => void) => void;
    disconnect: (cb: () => void) => void;
}
export default WebSockets;
