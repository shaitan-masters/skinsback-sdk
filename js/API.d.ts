import { AxiosResponse } from 'axios';
import { GameTypes, ApiConfig, CreateOrderResponse, OrderStatusResponse, OrdersStatusResponse, ServerStatusResponse, CallbackErrorListResponse, PriceListResponse, FindItemsResponse, BuyItemResponse, BoughtItemResponse, BoughtItemsHistoryResponse } from "./types";
declare class API {
    private static axios;
    private readonly config;
    private axios;
    constructor(apiConfig: ApiConfig);
    private static interceptorsInit;
    getBalance: () => Promise<AxiosResponse<any>>;
    getCurrencies: () => Promise<AxiosResponse<any>>;
    getOrders: ({ starting, ending }: {
        starting: number;
        ending: number;
    }) => Promise<OrdersStatusResponse>;
    getOrderStatusByTransactionId: (transaction_id: number | string) => Promise<OrderStatusResponse>;
    getOrderStatusByOrderId: (order_id: number) => Promise<OrderStatusResponse>;
    createOrder: (order_id: number) => Promise<CreateOrderResponse>;
    serverStatus: () => Promise<ServerStatusResponse>;
    getErrorCallbackList: () => Promise<CallbackErrorListResponse>;
    getMarketPriceList: (game?: GameTypes) => Promise<PriceListResponse>;
    findItemsByName: (name: string, game?: GameTypes) => Promise<FindItemsResponse>;
    buyItemByNameAndSendToUser: (data: {
        partner: string;
        token: string;
        max_price: number;
        name: string;
        game: GameTypes;
    }) => Promise<BuyItemResponse>;
    buyItemByIdAndSendToUser: (data: {
        partner: string;
        token: string;
        max_price: number;
        id: number | string;
    }) => Promise<BuyItemResponse>;
    getInfoAboutBoughtItem: (buy_id: string | number) => Promise<BoughtItemResponse>;
    getBoughtItemsHistory: ({ starting, ending }: {
        starting: number;
        ending: number;
    }) => Promise<BoughtItemsHistoryResponse>;
}
export default API;
