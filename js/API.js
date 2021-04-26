"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const Errors_1 = require("./Errors");
const defaultConfig_1 = require("./defaultConfig");
const axios_1 = __importDefault(require("axios"));
const Trace_1 = __importDefault(require("./Trace"));
const RateLimitter_1 = __importDefault(require("./RateLimitter"));
const SignatureGenerator_1 = require("./SignatureGenerator");
class API extends RateLimitter_1.default {
    constructor(apiConfig) {
        super(apiConfig.rate || null);
        this.getBalance = async () => {
            try {
                return await this._fetch({ method: types_1.API_METHODS.BALANCE });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getCurrencies = async () => {
            try {
                return await this._fetch({ method: types_1.API_METHODS.GET_CURRENCIES });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getOrders = async ({ starting, ending }) => {
            try {
                return await this._fetch({ starting, ending, method: types_1.API_METHODS.GET_ORDERS });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getOrderStatusByTransactionId = async (transaction_id) => {
            try {
                return await this._fetch({ transaction_id, method: types_1.API_METHODS.GET_ORDER_STATUS });
            }
            catch (e) {
                throw new Errors_1.OrderStatusError(e);
            }
        };
        this.getOrderStatusByOrderId = async (order_id) => {
            try {
                return await this._fetch({ order_id, method: types_1.API_METHODS.GET_ORDER_STATUS });
            }
            catch (e) {
                throw new Errors_1.OrderStatusError(e);
            }
        };
        this.createOrder = async (order_id) => {
            try {
                return await this._fetch({ order_id, method: types_1.API_METHODS.CREATE_ORDER });
            }
            catch (e) {
                throw new Errors_1.CreateOrderError(e);
            }
        };
        this.serverStatus = async () => {
            try {
                return await this._fetch({ method: types_1.API_METHODS.GET_SERVER_STATUS });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getErrorCallbackList = async () => {
            try {
                return await this._fetch({ method: types_1.API_METHODS.GET_ERROR_CALLBACK_ERROR_LIST });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getMarketPriceList = async (game = 'csgo') => {
            try {
                return await this._fetch({ game, method: types_1.API_METHODS.GET_MARKET_PRICE_LIST });
            }
            catch (e) {
                throw new Errors_1.PriceListError(e);
            }
        };
        this.findItemsByName = async (name, game = 'csgo') => {
            try {
                return await this._fetch({ name, game, method: types_1.API_METHODS.SEARCH_ITEMS });
            }
            catch (e) {
                throw new Errors_1.MarketSearchError(e);
            }
        };
        this.buyItemByNameAndSendToUser = async (params) => {
            try {
                params.partner = params.partner.toString();
                return await this._fetch({ ...params, method: types_1.API_METHODS.BUY_ITEM_AND_SEND });
            }
            catch (e) {
                throw new Errors_1.BuyItemError(e);
            }
        };
        this.buyItemByIdAndSendToUser = async (params) => {
            try {
                params.partner = params.partner.toString();
                return await this._fetch({ ...params, method: types_1.API_METHODS.BUY_ITEM_AND_SEND });
            }
            catch (e) {
                throw new Errors_1.BuyItemError(e);
            }
        };
        this.getInfoAboutBoughtItem = async (arg) => {
            try {
                let params;
                if (arg instanceof Array) {
                    params = { custom_ids: arg };
                }
                else {
                    params = { buy_id: arg };
                }
                return await this._fetch({ ...params, method: types_1.API_METHODS.GET_INFO_ABOUT_BOUGHT_ITEM });
            }
            catch (e) {
                throw new Errors_1.OrderInfoError(e);
            }
        };
        this.getBoughtItemsHistory = async ({ starting, ending }) => {
            try {
                return await this._fetch({ starting, ending, method: types_1.API_METHODS.GET_HISTORY });
            }
            catch (e) {
                throw new Errors_1.HistoryError(e);
            }
        };
        this.config = apiConfig;
        this.axios = axios_1.default.create({
            baseURL: this.config.apiUrl || defaultConfig_1.API_URL,
        });
        this.trace = this.config.trace ? new Trace_1.default(this.config.trace) : null;
        API.interceptorsInit.call(this, this.config, this.trace);
    }
    static interceptorsInit(apiConfig, trace) {
        this.axios.interceptors.request.use((config) => {
            // Adding shop_id field to requests body and
            // adding sign field generated by SignatureBuilder service
            const data = {
                ...config.data,
                shopid: apiConfig.shop_id,
            };
            data.sign = SignatureGenerator_1.SignatureApiBuilder(data, apiConfig.secret_key);
            config.data = data;
            // Return modified config with shop_id and signature
            return config;
        }, error => {
            // Write response data with error to logs
            trace && trace.writeResponse(error);
            return Promise.reject(error);
        });
        // Response interceptor
        this.axios.interceptors.response.use((response) => {
            // When received error, response has status 200? but it has status field in response body with error
            // or fail status. Interceptor checks status in response body and call reject if
            // status fail or error and write Promise value as response body
            if (response.data.status === 'error' || response.data.status === 'fail') {
                // Write response data with error to logs
                trace && trace.writeResponse(response, true);
                return Promise.reject(response);
            }
            // Write response data with data to logs
            trace && trace.writeResponse(response);
            return response.data;
        }, error => {
            // Write response data with error to logs
            trace && trace.writeResponse(error, true);
            return Promise.reject(error);
        });
    }
    _fetch(data) {
        const post = (arg) => this.axios.post('', arg);
        return this.schedule(post, data);
    }
}
exports.default = API;
