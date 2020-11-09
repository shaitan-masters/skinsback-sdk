import Api  from "./API";
import WS from "./WebSockets";

export * from './types';
export const API = Api;
export const WebSockets = WS;

const api = new API({
    shop_id: '2116',
    secret_key: 'ZQflT12V2qK2UmGGHjr0',
    logsPath: 'logs',
    enableLogs: true,
    excludeMethods: ['status'],
    amountOfLastDaysOfSavingLogs: 3
})

api.getBalance().catch(e => {console.log(e)})
