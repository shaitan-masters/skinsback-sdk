"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const SignatureGenerator_1 = require("./SignatureGenerator");
const defaultConfig_1 = require("./defaultConfig");
const types_1 = require("./types");
<<<<<<< HEAD
const Errors_1 = require("./Errors");
const TraceLimiter_1 = __importDefault(require("./TraceLimiter"));
class API extends TraceLimiter_1.default {
=======
const Trace_1 = __importDefault(require("./Trace"));
class API {
>>>>>>> SC-2008-Add_tracing_for_skinsback
    constructor(apiConfig) {
        super(apiConfig.trace || null);
        this.getBalance = async () => {
            try {
                return await this._fetch({ method: types_1.API_METHODS.BALANCE });
            }
            catch (e) {
                throw new Error(e);
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
        this.trace = null;
        if (this.config.enableLogs) {
            this.trace = new Trace_1.default({
                logsPath: this.config.logsPath,
                excludeMethods: this.config.excludeMethods,
                amountOfLastDaysOfSavingLogs: this.config.amountOfLastDaysOfSavingLogs
            });
        }
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
<<<<<<< HEAD
        }, error => Promise.reject(new Error(error)));
=======
        }, error => {
            // Write response data with error to logs
            trace && trace.logError(error);
            return Promise.reject(error);
        });
>>>>>>> SC-2008-Add_tracing_for_skinsback
        // Response interceptor
        this.axios.interceptors.response.use((response) => {
            // When received error, response has status 200? but it has status field in response body with error
            // or fail status. Interceptor checks status in response body and call reject if
            // status fail or error and write Promise value as response body
            if (response.data.status === 'error' || response.data.status === 'fail') {
                // Write response data with error to logs
                trace && trace.logResponseError(response);
                return Promise.reject(response);
            }
            // Write response data with data to logs
            trace && trace.logResponse(response);
            return response.data;
        }, error => {
<<<<<<< HEAD
            return Promise.reject(new Error(error));
=======
            // Write response data with error to logs
            trace && trace.logError(error);
            return Promise.reject(error);
>>>>>>> SC-2008-Add_tracing_for_skinsback
        });
    }
    _fetch(data) {
        const post = (arg) => this.axios.post('', arg);
        return this.schedule(post, data);
    }
}
exports.default = API;
