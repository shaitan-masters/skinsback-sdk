"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const SignatureGenerator_1 = require("./SignatureGenerator");
const defaultConfig_1 = require("./defaultConfig");
const types_1 = require("./types");
const Errors_1 = require("./Errors");
class API {
    constructor(apiConfig) {
        this.getBalance = async () => {
            try {
                return await this.axios.post('', { method: types_1.API_METHODS.BALANCE });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getCurrencies = async () => {
            try {
                return await this.axios.post('', { method: types_1.API_METHODS.GET_CURRENCIES });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getOrders = async ({ starting, ending }) => {
            try {
                return await this.axios.post('', { starting, ending, method: types_1.API_METHODS.GET_ORDERS });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getOrderStatusByTransactionId = async (transaction_id) => {
            try {
                return await this.axios.post('', { transaction_id, method: types_1.API_METHODS.GET_ORDER_STATUS });
            }
            catch (e) {
                throw new Errors_1.OrderStatusError(e);
            }
        };
        this.getOrderStatusByOrderId = async (order_id) => {
            try {
                return await this.axios.post('', { order_id, method: types_1.API_METHODS.GET_ORDER_STATUS });
            }
            catch (e) {
                throw new Errors_1.OrderStatusError(e);
            }
        };
        this.createOrder = async (order_id) => {
            try {
                return await this.axios.post('', { order_id, method: types_1.API_METHODS.CREATE_ORDER });
            }
            catch (e) {
                throw new Errors_1.CreateOrderError(e);
            }
        };
        this.serverStatus = async () => {
            try {
                return await this.axios.post('', { method: types_1.API_METHODS.GET_SERVER_STATUS });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getErrorCallbackList = async () => {
            try {
                return await this.axios.post('', { method: types_1.API_METHODS.GET_ERROR_CALLBACK_ERROR_LIST });
            }
            catch (e) {
                throw new Errors_1.DefaultError(e);
            }
        };
        this.getMarketPriceList = async (game = 'csgo') => {
            try {
                return await this.axios.post('', { game, method: types_1.API_METHODS.GET_MARKET_PRICE_LIST });
            }
            catch (e) {
                throw new Errors_1.PriceListError(e);
            }
        };
        this.findItemsByName = async (name, game = 'csgo') => {
            try {
                return await this.axios.post('', { name, game, method: types_1.API_METHODS.SEARCH_ITEMS });
            }
            catch (e) {
                throw new Errors_1.MarketSearchError(e);
            }
        };
        this.buyItemByNameAndSendToUser = async (params) => {
            try {
                params.partner = params.partner.toString();
                return await this.axios.post('', { ...params, method: types_1.API_METHODS.BUY_ITEM_AND_SEND });
            }
            catch (e) {
                throw new Errors_1.BuyItemError(e);
            }
        };
        this.buyItemByIdAndSendToUser = async (params) => {
            try {
                params.partner = params.partner.toString();
                return await this.axios.post('', { ...params, method: types_1.API_METHODS.BUY_ITEM_AND_SEND });
            }
            catch (e) {
                throw new Errors_1.BuyItemError(e);
            }
        };
        this.getInfoAboutBoughtItem = async (buy_id, custom_ids) => {
            try {
                const params = { buy_id };
                if (custom_ids instanceof Array) {
                    params.custom_ids = custom_ids;
                }
                return await this.axios.post('', { ...params, method: types_1.API_METHODS.GET_INFO_ABOUT_BOUGHT_ITEM });
            }
            catch (e) {
                throw new Errors_1.OrderInfoError(e);
            }
        };
        this.getBoughtItemsHistory = async ({ starting, ending }) => {
            try {
                return await this.axios.post('', { starting, ending, method: types_1.API_METHODS.GET_HISTORY });
            }
            catch (e) {
                throw new Errors_1.HistoryError(e);
            }
        };
        this.config = apiConfig;
        this.axios = axios_1.default.create({
            baseURL: this.config.apiUrl || defaultConfig_1.API_URL,
        });
        API.interceptorsInit.call(this, this.config);
    }
    static interceptorsInit(apiConfig) {
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
        }, error => Promise.reject(new Error(error)));
        // Response interceptor
        this.axios.interceptors.response.use((response) => {
            // When received error, response has status 200? but it has status field in response body with error
            // or fail status. Interceptor checks status in response body and call reject if
            // status fail or error and write Promise value as response body
            if (response.data.status === 'error' || response.data.status === 'fail') {
                return Promise.reject(response.data);
            }
            return response.data;
        }, error => {
            return Promise.reject(new Error(error));
        });
    }
}
exports.default = API;
