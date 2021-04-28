import {createHmac} from 'crypto';
import md5 from 'md5';
import {Params} from "./types";

export const SignatureApiBuilder = (params: Params, secret_key: string) => {
    let	paramsString: string = Object.entries(params)
        .sort()
        .reduce((paramsAsString, [key, value]) => {
            if (key === 'sign' || typeof value == 'object') return paramsAsString;
            return paramsAsString + key + ':' + value + ';';
        }, '')

    return createHmac('sha1', secret_key).update(paramsString).digest('hex');
}

export const SignatureWebSocketsBuilder = (shop_id: string | number, secret_key: string) => {
    return md5(shop_id+secret_key);
}
