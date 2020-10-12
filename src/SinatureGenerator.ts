import {createHmac} from 'crypto';
import {Params} from "./types";

export const SignatureBuilder = (params: Params, secret_key: string) => {
    let	paramsString: string = Object.entries(params)
        .sort()
        .reduce((paramsAsString, [key, value]) => {
            if (key === 'sign' || typeof key == 'object') return paramsAsString;
            return paramsAsString + key + ':' + value + ';';
        }, '')

    return createHmac('sha1', secret_key).update(paramsString).digest('hex');
}
