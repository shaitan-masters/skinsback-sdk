# Node module for [skinsback.com](https://skinsback.com) API.
## Installation

`npm install skinsback-sdk`

## Usage
```javascript
const API = require('skinsback-sdk').API;
```
or
```javascript
import {API} from 'skinsback-sdk';
````
## Constructor options

- `options[shop_id]`: your shop_id key **required**
- `options[secret_key]`: Your personal `secret key` for generate signature **required**. [More about generate signature](https://skinsback.com/profile.php?act=api&item=signature).
- `options[apiUrl]`: url to API. *Default: `https://skinsback.com/api.php`.*

#### Example
```javascript
import {API} from 'skinsback-sdk';

const options = {
    shop_id: 1490,
    secret_key: 'XCvlP45Y2dH2UmHhk'
}

const api = new API(options);
```

## Api methods
All methods of api return a Promise.
* [Check the balance on the site](https://skinsback.com/profile.php?act=api&item=balance) 
```javascript
api.getBalance() 
```
* [Get currencies and rates](https://skinsback.com/profile.php?act=api&item=currencies) 
```javascript
api.getCurrencies() 
```
* [Get orders list](https://skinsback.com/profile.php?act=api&item=orders) 
```javascript
const params = {
    starting: 15123132, /// Unix time starting
    ending: 15125832   /// Unix time ending
}
api.getOrders(params) 
```
* [Check order status by Transaction Id](https://skinsback.com/profile.php?act=api&item=orderstatus) 
```javascript
const transaction_id = 65236
api.getOrderStatusByTransactionId(transaction_id) 
```
* [Check order status by Order Id](https://skinsback.com/profile.php?act=api&item=orderstatus) 
```javascript
const order_id = 636
api.getOrderStatusByOrderId(order_id) 
```
* [Create order](https://skinsback.com/profile.php?act=api&item=createorder) 
```javascript
const order_id = 636 ///Уникальный ID заказа в вашей системе
api.createOrder(order_id) 
```
* [Get server status](https://skinsback.com/profile.php?act=api&item=status) 
```javascript
api.serverStatus() 
```
* [Get error callbacks list](https://skinsback.com/profile.php?act=api&item=callback_errors) 
```javascript
api.getErrorCallbackList() 
```
* [MARKET: Price list (Skins availability)](https://skinsback.com/profile.php?act=api&item=market_pricelist) 
```javascript
const game = 'csgo' // Game types 'dota2' or 'csgo'. Default: 'csgo'
api.getMarketPriceList([game]) 
```
* [MARKET: Search skins by name](https://skinsback.com/profile.php?act=api&item=market_search) 
```javascript
const name = 'FAMAS' // name of skin
const game = 'csgo' // Game types 'dota2' or 'csgo'. Default: 'csgo'
api.getMarketPriceList(name, [game]) 
```
* [MARKET: Buy skin by skin name and send to user](https://skinsback.com/profile.php?act=api&item=market_buy) 
```javascript
const name = 'FAMAS' // name of skin
const game = 'csgo' // Game types 'dota2' or 'csgo'. Default: 'csgo'
api.buyItemByNameAndSendToUser(name, [game]) 
```
* [MARKET: Buy skin by skin Id and send to user](https://skinsback.com/profile.php?act=api&item=market_buy) 
```javascript
const params = {
    partner: string, // partner value from user trade URL
    token: string, //   token value from user trade URL
    max_price: number, // max skin cost for buying (as USD). Used as a cost limiter.
    name: string, // Skin name (market hash name)
    game: string // Game types 'dota2' or 'csgo'. Default: 'csgo'
}
api.buyItemByIdAndSendToUser(params) 
```
* [MARKET: Get purchase information](https://skinsback.com/profile.php?act=api&item=market_getinfo) 
```javascript
const buy_id = 12354322 /// buy_id from method buyItemByIdAndSendToUser or buyItemByNameAndSendToUser
api.getInfoAboutBoughtItem(buy_id) 
```
* [MARKET: Purchase history](https://skinsback.com/profile.php?act=api&item=market_history) 
```javascript
const params = {
    starting: 15123132, /// Unix time starting
    ending: 15125832   /// Unix time ending
}
api.getBoughtItemsHistory(params) 
```

## WebSockets
Getting real-time changes for purchased skins.

## Usage
```javascript
const WebSockets = require('skinsback-sdk').WebSockets;
```
or
```javascript
import {WebSockets} from 'skinsback-sdk';
````
## Constructor options

- `options[shop_id]`: your shop_id key **required**
- `options[secret_key]`: Your personal `secret key` for generate signature. [More about generate signature](https://skinsback.com/profile.php?act=api&item=market_websocket) **required**.
- `options[socket_url]`: SkinsBack socket url [Show more](https://skinsback.com/profile.php?act=api&item=market_websocket)
####Example
```javascript
import {WebSockets} from 'skinsback-sdk';

const options = {
    shop_id: 1490,
    secret_key: 'XCvlP45Y2dH2UmHhkl1',
    socket_url: 'ws://185.71.65.202:7777'
}

const sockets = new WebSockets(options);
```
## WebSockets methods
* [Subscribing to socket events](https://skinsback.com/profile.php?act=api&item=market_websocket)
(Data arriving via sockets goes into the callback function argument as a parsed object)
```javascript
sockets.subscribe(data => console.log(data));
```
* Calling a callback function when connecting to sockets
```javascript
const cb = () => console.log('Connected')
sockets.connect(cb) 
```
* Calling a callback function when disconnecting from sockets 
```javascript
const cb = () => console.log('Disconnected')
sockets.disconnect(cb)
```
