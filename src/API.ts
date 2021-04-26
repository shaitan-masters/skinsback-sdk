import {
    API_METHODS,
    GameTypes,
    ApiConfig,
    CreateOrderResponse,
    OrderStatusResponse,
    OrdersStatusResponse,
    ServerStatusResponse,
    CallbackErrorListResponse,
    PriceListResponse,
    FindItemsResponse,
    BuyItemResponse,
    BoughtItemResponse,
    BoughtItemsHistoryResponse,
    BalanceResponse,
    Currencies,
} from "./types";

import {
    BuyItemError,
    CreateOrderError,
    DefaultError, HistoryError,
    MarketSearchError, OrderInfoError,
    OrderStatusError,
    PriceListError
} from './Errors';


import { API_URL } from "./defaultConfig";


import axios, {
    AxiosInstance, 
    AxiosRequestConfig, 
    AxiosResponse
} from 'axios';
import Trace from "./Trace";
import RateLimitter from "./RateLimitter";
import { SignatureApiBuilder } from './SignatureGenerator';

class API extends RateLimitter{
    private static axios: AxiosInstance;
    private readonly config: ApiConfig;
    private axios: AxiosInstance;
    private trace: Trace | null;

    constructor(apiConfig: ApiConfig) {
        super(apiConfig.rate || null)

        this.config = apiConfig;

        this.axios = axios.create({
            baseURL: this.config.apiUrl || API_URL,
        })
        
        this.trace = this.config.trace ? new Trace(this.config.trace) : null;

        API.interceptorsInit.call(this, this.config, this.trace);
    }

    private static interceptorsInit(apiConfig: ApiConfig, trace: Trace | null) {
        this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
            // Adding shop_id field to requests body and
            // adding sign field generated by SignatureBuilder service
            const data = {
                ...config.data,
                shopid: apiConfig.shop_id,
            }
            
            data.sign = SignatureApiBuilder(data, apiConfig.secret_key)
            
            config.data = data
            // Return modified config with shop_id and signature
            return config;
        }, error => {
            // Write response data with error to logs
            trace && trace.writeResponse(error);
            return Promise.reject(error)
        });

        // Response interceptor
        this.axios.interceptors.response.use((response: AxiosResponse) => {
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
        },error => {
            // Write response data with error to logs
            trace && trace.writeResponse(error, true);
            return Promise.reject(error);
        });
    }

    public getBalance = async (): Promise<BalanceResponse> => {
        try {
            return await this._fetch<BalanceResponse>({method: API_METHODS.BALANCE})
        } catch (e) {
            throw new DefaultError(e);
        }

    }

    public getCurrencies = async (): Promise<Currencies> => {
        try {
            return await this._fetch<Currencies>({method: API_METHODS.GET_CURRENCIES})
        } catch (e) {
            throw new DefaultError(e);
        }
    }

    public getOrders = async ({
        starting,
        ending
    } : {starting: number, ending: number}): Promise<OrdersStatusResponse> => {
        try {
            return await this._fetch<OrdersStatusResponse>({starting, ending, method: API_METHODS.GET_ORDERS})
        } catch (e) {
            throw new DefaultError(e);
        }
    }

    public getOrderStatusByTransactionId = async (transaction_id: number | string): Promise<OrderStatusResponse> => {
        try {
            return await this._fetch<OrderStatusResponse>({transaction_id, method: API_METHODS.GET_ORDER_STATUS})
        } catch (e) {
            throw new OrderStatusError(e);
        }
    }

    public getOrderStatusByOrderId = async (order_id: number): Promise<OrderStatusResponse> => {
        try {
            return await this._fetch<OrderStatusResponse>({order_id, method: API_METHODS.GET_ORDER_STATUS})
        } catch (e) {
            throw new OrderStatusError(e);
        }
    }

    public createOrder = async (order_id: number): Promise<CreateOrderResponse> => {
        try {
            return await this._fetch<CreateOrderResponse>({order_id, method: API_METHODS.CREATE_ORDER})
        } catch (e) {
            throw new CreateOrderError(e);
        }
    }

    public serverStatus = async (): Promise<ServerStatusResponse> => {
        try {
            return await this._fetch<ServerStatusResponse>({method: API_METHODS.GET_SERVER_STATUS})
        } catch (e) {
            throw new DefaultError(e);
        }
    }

    public getErrorCallbackList = async (): Promise<CallbackErrorListResponse> => {
        try {
            return await this._fetch<CallbackErrorListResponse>({method: API_METHODS.GET_ERROR_CALLBACK_ERROR_LIST})
        } catch (e) {
            throw new DefaultError(e);
        }
    }

    public getMarketPriceList = async (game: GameTypes = 'csgo'): Promise<PriceListResponse> => {
        try {
            return await this._fetch<PriceListResponse>({game, method: API_METHODS.GET_MARKET_PRICE_LIST})
        } catch (e) {
            throw new PriceListError(e);
        }
    }

    public findItemsByName = async (name: string, game: GameTypes = 'csgo'): Promise<FindItemsResponse> => {
        try {
            return await this._fetch<FindItemsResponse>({name, game, method: API_METHODS.SEARCH_ITEMS})
        } catch (e) {
            throw new MarketSearchError(e);
        }
    }

    public buyItemByNameAndSendToUser = async (
        params: {partner: string, token: string, max_price?: number, name: string, game: GameTypes, custom_id?: number}
    ): Promise<BuyItemResponse> => {
        try {
            params.partner = params.partner.toString();
            return await this._fetch<BuyItemResponse>({...params, method: API_METHODS.BUY_ITEM_AND_SEND})
        } catch (e) {
            throw new BuyItemError(e);
        }
    }

    public buyItemByIdAndSendToUser = async (
        params: { partner: string, token: string, max_price?: number, id: number | string, custom_id?: number}
    ): Promise<BuyItemResponse> => {
        try {
            params.partner = params.partner.toString();
            return await this._fetch<BuyItemResponse>({...params, method: API_METHODS.BUY_ITEM_AND_SEND})
        } catch (e) {
            throw new BuyItemError(e);
        }
    }

    public getInfoAboutBoughtItem = async (arg: string | number | Array<string>): Promise<BoughtItemResponse> => {
        try {
            let params;
            if (arg instanceof Array) {
                params = {custom_ids: arg};
            } else {
                params = {buy_id: arg}
            }
            return await this._fetch<BoughtItemResponse>({...params, method: API_METHODS.GET_INFO_ABOUT_BOUGHT_ITEM})
        } catch (e) {
            throw new OrderInfoError(e);
        }
    }

    public getBoughtItemsHistory = async ({
        starting,
        ending
    }: {starting: number, ending: number}): Promise<BoughtItemsHistoryResponse> => {
        try {
            return await this._fetch<BoughtItemsHistoryResponse>({starting, ending, method: API_METHODS.GET_HISTORY})
        } catch (e) {
            throw new HistoryError(e);
        }
    }

    private _fetch<T>(data: {[key: string]:any}): Promise<T> {
        const post = (arg: {[key: string]:any}): Promise<T> => this.axios.post('', arg);
        return this.schedule(post, data);
    }

}

export default API;