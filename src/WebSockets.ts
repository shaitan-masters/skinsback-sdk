import WS from 'ws';
import {SignatureWebSocketsBuilder} from './SignatureGenerator';
import {WS_URL} from "./defaultConfig";
import {
    SocketData,
    SubscribeCallback,
    WebSocketConfig
} from './types';


const getConnectedURL = ({shop_id, secret_key, socket_url}: WebSocketConfig) => {
    const signature = SignatureWebSocketsBuilder(shop_id, secret_key);
    return `${socket_url || WS_URL}/?shopid=${shop_id}&signature=${signature}`
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

