export interface Params {
    [key: string]: any;
}

export interface ApiConfig {
    shop_id: number | string,
    secret_key: string,
    apiUrl?: string,
}

export interface Item {
    id: string,
    name: string,
    price: string,
    classid: string,
    instanceid: string,
}

export interface ErrorCallback {
    transaction_id: string,
    order_id: string,
    http_code: string
}

export enum API_METHODS {
    BALANCE='balance',
    CREATE_ORDER='create',
    GET_CURRENCIES='currencies',
    GET_ORDERS='orders',
    GET_ORDER_STATUS='orderstatus',
    GET_SERVER_STATUS='status',
    GET_ERROR_CALLBACK_ERROR_LIST='callback_error_list',
    GET_MARKET_PRICE_LIST='market_pricelist',
    SEARCH_ITEMS='market_search',
    BUY_ITEM_AND_SEND='market_buy',
    GET_INFO_ABOUT_BOUGHT_ITEM='market_getinfo'
}

export type GameTypes = 'csgo' | 'dota2'
export type ResponseStatusType = 'success' | 'error';
export type OrderStatusType = 'pending' | 'fail' | 'success';
export type ReasonStatusServerType = 'site_off' | 'no_bots';
export type OfferStatusType =
    'creating_trade' |
    'waiting_accept' |
    'accepted' |
    'canceled' |
    'timeout' |
    'invalid_trade_token' |
    'user_not_tradable' |
    'trade_create_error';


export interface Status {
    status: ResponseStatusType
}

export interface BalanceResponse extends Status {
    balance: string,
    balance_in_currencies: {[key: string]: string},
    deals_sum: string,
    deals_sum_in_currencies: {[key: string]: string},
    withdraw_sum: string,
    withdraw_sum_in_currencies: {[key: string]: string}
}

export interface Currencies extends Status {
    items: Array<{ code: string, name: string, rate: string }>
}

export interface CreateOrderResponse extends Status {
    url: string,
    transaction_id: number,
}

export interface OrderModel{
    transaction_id: number,
    order_id: number,
    steam_id: string,
    date: string,
    amount?: string,
    amount_currency?: string,
    amount_in_currencies?: {[key: string]: any},
    user_amount: string,
    user_amount_in_currencies?: {[key: string]: any},
    offer_date?: string,
    skins_send_date?: string,
    skins?: Array<{name: string, price: string}>
}

export interface OrderStatusResponse extends OrderModel{
    status: OrderStatusType,
}

export interface OrdersStatusResponse extends OrderModel{
    status: OrderStatusType,
    items?: Array<OrderModel>
}

export interface ServerStatusResponse extends Status {
    available: boolean,
    reason?: ReasonStatusServerType,
}

export interface CallbackErrorListResponse extends Status {
    items: Array<ErrorCallback>,
}

export interface PriceListResponse extends Status {
    last_update?: string,
    items?: Array<{
        name: string,
        price: string,
        count: string
    }>
}

export interface FindItemsResponse extends Status {
    items?: Array<Item>
}

export interface BuyItemResponse extends Status {
    item?: Item,
    buy_id: string,
    offer_status: string,
    balance_debited_sum: string
}

export interface BoughtItemResponse extends Status {
    item?: Item,
    buy_id?: string,
    offer_status?: OfferStatusType,
    steamid?: string,
    date?: string,
    balance_debited_sum?: string
}

export interface BoughtItemsHistoryResponse extends Status {
    items?: Array<{
        item: Item,
        tradeofferid: string,
        buy_id: string,
        offer_status: OfferStatusType,
        steamid: string,
        date: string
    }>,
    total_count?: string,
    has_more?: boolean,
    start_from?: string
}