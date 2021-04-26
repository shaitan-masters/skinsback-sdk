"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryError = exports.OrderInfoError = exports.BuyItemError = exports.MarketSearchError = exports.PriceListError = exports.OrderStatusError = exports.CreateOrderError = exports.DefaultError = exports.HistoryErrorsEnum = exports.GetOrderInfoErrorsEnum = exports.BuyItemErrorsEnum = exports.FindItemErrorsEnum = exports.PriceListErrorsEnum = exports.OrderStatusErrorsEnum = exports.CreateOrderErrorsEnum = exports.DefaultErrorsEnum = void 0;
/// Default Errors
var DefaultErrorsEnum;
(function (DefaultErrorsEnum) {
    DefaultErrorsEnum["please_use_post_method"] = "please_use_post_method";
    DefaultErrorsEnum["invalid_shopid"] = "invalid_shopid";
    DefaultErrorsEnum["invalid_signature"] = "invalid_signature";
    DefaultErrorsEnum["shop_not_active"] = "shop_not_active";
    DefaultErrorsEnum["invalid_method"] = "invalid_method";
    DefaultErrorsEnum["request_limit_reached"] = "request_limit_reached";
    DefaultErrorsEnum["request_timeout"] = "request_timeout";
})(DefaultErrorsEnum = exports.DefaultErrorsEnum || (exports.DefaultErrorsEnum = {}));
// CreateOrderErrors
var CreateOrderErrorsEnum;
(function (CreateOrderErrorsEnum) {
    CreateOrderErrorsEnum["invalid_order_id"] = "invalid_order_id";
    CreateOrderErrorsEnum["invalid_steam_id"] = "invalid_steam_id";
    CreateOrderErrorsEnum["invalid_trade_token"] = "invalid_trade_token";
    CreateOrderErrorsEnum["min_amount_requires_currency"] = "min_amount_requires_currency";
    CreateOrderErrorsEnum["order_id_already_exists"] = "order_id_already_exists";
})(CreateOrderErrorsEnum = exports.CreateOrderErrorsEnum || (exports.CreateOrderErrorsEnum = {}));
///OrderStatusErrors
var OrderStatusErrorsEnum;
(function (OrderStatusErrorsEnum) {
    OrderStatusErrorsEnum["order_id_or_transaction_id_missing"] = "order_id_or_transaction_id_missing";
    OrderStatusErrorsEnum["invalid_order_id"] = "invalid_order_id";
    OrderStatusErrorsEnum["invalid_transaction_id"] = "invalid_transaction_id";
    OrderStatusErrorsEnum["transaction_not_found"] = "transaction_not_found";
})(OrderStatusErrorsEnum = exports.OrderStatusErrorsEnum || (exports.OrderStatusErrorsEnum = {}));
// PriceList
var PriceListErrorsEnum;
(function (PriceListErrorsEnum) {
    PriceListErrorsEnum["market_disabled"] = "market_disabled";
})(PriceListErrorsEnum = exports.PriceListErrorsEnum || (exports.PriceListErrorsEnum = {}));
// FindItem
var FindItemErrorsEnum;
(function (FindItemErrorsEnum) {
    FindItemErrorsEnum["market_disabled"] = "market_disabled";
    FindItemErrorsEnum["missing_name"] = "missing_name";
    FindItemErrorsEnum["name_min_length_3"] = "name_min_length_3";
})(FindItemErrorsEnum = exports.FindItemErrorsEnum || (exports.FindItemErrorsEnum = {}));
// BuyItem
var BuyItemErrorsEnum;
(function (BuyItemErrorsEnum) {
    BuyItemErrorsEnum["market_disabled"] = "market_disabled";
    BuyItemErrorsEnum["missing_name_and_id"] = "missing_name_and_id";
    BuyItemErrorsEnum["name_min_length_3"] = "name_min_length_3";
    BuyItemErrorsEnum["missing_partner_or_token"] = "missing_partner_or_token";
    BuyItemErrorsEnum["insufficient_funds"] = "insufficient_funds";
    BuyItemErrorsEnum["skin_unavailable"] = "skin_unavailable";
    BuyItemErrorsEnum["skins_not_found_at_specified_price"] = "skins_not_found_at_specified_price";
    BuyItemErrorsEnum["custom_id_already_exists"] = "custom_id_already_exists";
})(BuyItemErrorsEnum = exports.BuyItemErrorsEnum || (exports.BuyItemErrorsEnum = {}));
// GetOrderInfo
var GetOrderInfoErrorsEnum;
(function (GetOrderInfoErrorsEnum) {
    GetOrderInfoErrorsEnum["market_disabled"] = "market_disabled";
    GetOrderInfoErrorsEnum["missing_buy_id"] = "missing_buy_id";
    GetOrderInfoErrorsEnum["offer_not_found"] = "offer_not_found";
})(GetOrderInfoErrorsEnum = exports.GetOrderInfoErrorsEnum || (exports.GetOrderInfoErrorsEnum = {}));
// History
var HistoryErrorsEnum;
(function (HistoryErrorsEnum) {
    HistoryErrorsEnum["missing_starting_or_ending"] = "missing_starting_or_ending";
})(HistoryErrorsEnum = exports.HistoryErrorsEnum || (exports.HistoryErrorsEnum = {}));
// Decorator for adding getter
const ErrorList = (enumProp) => {
    return function (target, _) {
        Object.defineProperty(target, 'errorList', {
            get: () => ({ ...enumProp, ...DefaultErrorsEnum }),
        });
    };
};
class DefaultError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(DefaultErrorsEnum)
], DefaultError.prototype, "status", void 0);
exports.DefaultError = DefaultError;
class CreateOrderError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(CreateOrderErrorsEnum)
], CreateOrderError.prototype, "status", void 0);
exports.CreateOrderError = CreateOrderError;
class OrderStatusError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(OrderStatusErrorsEnum)
], OrderStatusError.prototype, "status", void 0);
exports.OrderStatusError = OrderStatusError;
class PriceListError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(PriceListErrorsEnum)
], PriceListError.prototype, "status", void 0);
exports.PriceListError = PriceListError;
class MarketSearchError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(FindItemErrorsEnum)
], MarketSearchError.prototype, "status", void 0);
exports.MarketSearchError = MarketSearchError;
class BuyItemError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(BuyItemErrorsEnum)
], BuyItemError.prototype, "status", void 0);
exports.BuyItemError = BuyItemError;
class OrderInfoError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(GetOrderInfoErrorsEnum)
], OrderInfoError.prototype, "status", void 0);
exports.OrderInfoError = OrderInfoError;
class HistoryError {
    constructor(data) {
        var _a, _b;
        this.status = 'error';
        this.error_code = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.error_code) || -999;
        this.error_message = ((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.error_message) || 'request_timeout';
    }
}
__decorate([
    ErrorList(HistoryErrorsEnum)
], HistoryError.prototype, "status", void 0);
exports.HistoryError = HistoryError;
