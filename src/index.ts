import Api  from "./API";
import WS from "./WebSockets";
import * as Errors from "./Errors";

export const API = Api;
export const WebSockets = WS;

// Errors
export const {
    DefaultError,
    CreateOrderError,
    OrderStatusError,
    PriceListError,
    MarketSearchError,
    BuyItemError,
    OrderInfoError,
    HistoryError
} = Errors;
