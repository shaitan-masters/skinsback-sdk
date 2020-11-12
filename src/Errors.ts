type ErrorStatus = 'error' | 'fail';

interface ErrorModel<T> {
    status: ErrorStatus,
    error_code: number,
    error_message: T,
}

/// Default Errors
export enum DefaultErrorsEnum {
    please_use_post_method='please_use_post_method',
    invalid_shopid='invalid_shopid',
    invalid_signature='invalid_signature',
    shop_not_active='shop_not_active',
    invalid_method='invalid_method',
}

type DefaultErrorType = keyof typeof DefaultErrorsEnum

// CreateOrderErrors
export enum CreateOrderErrorsEnum {
    invalid_order_id='invalid_order_id',
    invalid_steam_id='invalid_steam_id',
    invalid_trade_token='invalid_trade_token',
    min_amount_requires_currency='min_amount_requires_currency',
    order_id_already_exists='order_id_already_exists',
}

type CreateOrderErrorsType = keyof typeof CreateOrderErrorsEnum;
///OrderStatusErrors
export enum OrderStatusErrorsEnum {
    order_id_or_transaction_id_missing='order_id_or_transaction_id_missing',
    invalid_order_id='invalid_order_id',
    invalid_transaction_id='invalid_transaction_id',
    transaction_not_found='transaction_not_found',
}

type OrderStatusErrorsType = keyof typeof OrderStatusErrorsEnum;

// PriceList
export enum PriceListErrorsEnum {
    market_disabled='market_disabled'
}

type PriceListErrorsType = keyof typeof PriceListErrorsEnum;

// FindItem
export enum FindItemErrorsEnum {
    market_disabled='market_disabled',
    missing_name='missing_name',
    name_min_length_3='name_min_length_3',
}

type FindItemsType = keyof typeof FindItemErrorsEnum;

// BuyItem
export enum BuyItemErrorsEnum {
    market_disabled='market_disabled',
    missing_name_and_id='missing_name_and_id',
    name_min_length_3='name_min_length_3',
    missing_partner_or_token='missing_partner_or_token',
    insufficient_funds='insufficient_funds',
    skin_unavailable='skin_unavailable',
    skins_not_found_at_specified_price='skins_not_found_at_specified_price',
    custom_id_already_exists='custom_id_already_exists',
}

type BuyItemType = keyof typeof BuyItemErrorsEnum;

// GetOrderInfo
export enum GetOrderInfoErrorsEnum {
    market_disabled='market_disabled',
    missing_buy_id='missing_buy_id',
    offer_not_found='offer_not_found',
}

type GetOrderInfoType = keyof typeof GetOrderInfoErrorsEnum;

// History
export enum HistoryErrorsEnum {
    missing_starting_or_ending='missing_starting_or_ending',
}

type HistoryType = keyof typeof HistoryErrorsEnum;

// Decorator for adding getter
const ErrorList = (enumProp: any) => {
    return function(target: any, _: string) {
        Object.defineProperty(target, 'errorList', {
            get: () => ({...enumProp, ...DefaultErrorsEnum}),
        });
    }
}

export class DefaultError implements ErrorModel<DefaultErrorType>{
    @ErrorList(DefaultErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: DefaultErrorType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}

export class CreateOrderError implements ErrorModel<CreateOrderErrorsType>{
    @ErrorList(CreateOrderErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: CreateOrderErrorsType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}

export class OrderStatusError implements ErrorModel<OrderStatusErrorsType>{
    @ErrorList(OrderStatusErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: OrderStatusErrorsType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}

export class PriceListError implements ErrorModel<PriceListErrorsType>{
    @ErrorList(PriceListErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: PriceListErrorsType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}

export class MarketSearchError implements ErrorModel<FindItemsType>{
    @ErrorList(FindItemErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: FindItemsType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}

export class BuyItemError implements ErrorModel<BuyItemType>{
    @ErrorList(BuyItemErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: BuyItemType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}

export class OrderInfoError implements ErrorModel<GetOrderInfoType>{
    @ErrorList(GetOrderInfoErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: GetOrderInfoType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}
export class HistoryError implements ErrorModel<HistoryType>{
    @ErrorList(HistoryErrorsEnum)
    public status: ErrorStatus;
    public error_code: number;
    public error_message: HistoryType;
    constructor(data: any) {
        this.status = 'error';
        this.error_code = data.error_code
        this.error_message = data.error_message;
    }
}