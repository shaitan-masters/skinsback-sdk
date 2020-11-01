import { Params } from "./types";
export declare const SignatureApiBuilder: (params: Params, secret_key: string) => string;
export declare const SignatureWebSocketsBuilder: (shop_id: string | number, secret_key: string) => string;
