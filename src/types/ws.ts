export interface WebSocketConfig {
    shop_id: string | number,
    secret_key: string,
    socket_url?: string,
}

export type EventStatuses =
    'auth_success' |
    'auth_failed' |
    'buy_item' |
    'status_change' |
    'balance_change'

export interface BuyItemData {
    item: {
        id: string,
        name: string,
        price: string,
        classid: string,
        instanceid: string
    },
    buy_id: string,
    offer_status: string,
    balance_debited_sum: string
}

export interface StatusChangeData {
    item: {
        id: string,
    },
    buy_id: string,
    offer_status: string,
    tradeofferid:string
}

export interface BalanceChangeData {
    balance_value: string
}

export type SubscribeCallback = (data: SocketData) => void;

export interface SocketData {
    event: EventStatuses,
    data: BuyItemData | StatusChangeData | BalanceChangeData
}
