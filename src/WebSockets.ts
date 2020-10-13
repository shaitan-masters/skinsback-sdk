import WS from 'ws';
import {SignatureWebSocketsBuilder} from './SinatureGenerator';
import {
    SocketData,
    SubscribeCallback,
    WebSocketConfig
} from './types';


const getConnectedURL = ({shop_id, secret_key}: WebSocketConfig) => {
    const signature = SignatureWebSocketsBuilder(shop_id, secret_key);
    return `ws://185.71.65.202:7777/?shopid=${shop_id}&signature=${signature}`
};

class WebSockets extends WS {
    constructor(config: WebSocketConfig) {
        super(getConnectedURL(config));
    }

    public subscribe = (cb: SubscribeCallback): void => {
        this.onmessage = event => {
            const data: SocketData = JSON.parse(event.data as string);
            cb(data);
        }
    }

    public connect = (cb: () => void): void => {
        this.onopen = cb;
    }

    public disconnect = (cb: () => void): void => {
        this.onclose = cb;
    }
}

export default WebSockets;

