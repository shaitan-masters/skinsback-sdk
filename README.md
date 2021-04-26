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
const { API } = require('./../js');

const options = {
  secret_key: '', // Insert your secret-key from panel
  shop_id: 0 // Insert your shop-id from panel
};

const api = new API(options);

api.getBalance()
  .then(v => console.log('Response', v))
  .catch(v => console.log('Error', v));
```

## Rate limiter
## Constructor options

- `options[requestLimit]`: How many request will be able running per **timeLimit**. *Default: 150*
- `options[timeLimit]`: interval between which a certain number of requests is allowed. *Default: 60000 milliseconds*

#### Example
```javascript
const { API } = require('./../js');

const options = {
  secret_key: '', // Insert your secret-key from panel
  shop_id: 0, // Insert your shop-id from panel
  rate: {
    requestLimit: 50,
    timeLimit: 60000
  }
};

const api = new API(options);

api.getBalance()
  .then(v => console.log('Response', v))
  .catch(v => console.log('Error', v));
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
api.findItemsByName(name, [game]);
```
* [MARKET: Buy skin by skin name and send to user](https://skinsback.com/profile.php?act=api&item=market_buy) 
```javascript
const params = {
    partner: string, // partner value from user trade URL
    token: string, //   token value from user trade URL
    max_price?: number, // max skin cost for buying (as USD). Used as a cost limiter.
    name: string, // Skin name (market hash name)
    game: string, // Game types 'dota2' or 'csgo'. Default: 'csgo'
    custom_id?: number, // ID on your system. Can be used to prevent duplicate purchases.
}
api.buyItemByNameAndSendToUser(params);
```
* [MARKET: Buy skin by skin Id and send to user](https://skinsback.com/profile.php?act=api&item=market_buy) 
```javascript
const params = {
    partner: string, // partner value from user trade URL
    token: string, //   token value from user trade URL
    max_price?: number, // max skin cost for buying (as USD). Used as a cost limiter.
    id: number, // Item ID from method findItemsByName
    custom_id?: number, // ID on your system. Can be used to prevent duplicate purchases.
}
api.buyItemByIdAndSendToUser(params) 
```
* [MARKET: Get purchase information](https://skinsback.com/profile.php?act=api&item=market_getinfo) 
```javascript
const buy_id = 12354322 /// buy_id from method buyItemByIdAndSendToUser or buyItemByNameAndSendToUser
const custom_ids = [245221] /// custom_id from market_buy method. If this parameter is specified, 
/// the response will contain an items array containing information on each purchase.

api.getInfoAboutBoughtItem(buy_id); /// Get info by buy_id
api.getInfoAboutBoughtItem(custom_ids); // Get info by custom_ids
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

## Trace requests
Logged request to json files. All logs saved as file with name in format as date *mm_dd_yyyy.json*.
All logs saving to path specified in the description `options[logsPath]`
<br>
Example: **11_06_2020.json**

## Rate field options

- `options[logsPath]`: path to save files with logs.
- `options[excludeMethods]`: List with methods that not used in trace. Default empty array.
- `options[amountOfLastDaysOfSavingLogs]`: Amount of last days for saving logs.

#### Example
```javascript
const { API } = require('./../js');

const options = {
  secret_key: '', // Insert your secret-key from panel
  shop_id: 0, // Insert your shop-id from panel
  trace: {
    excludeMethods: [ 'balance' ],
    logsPath: './logs/skinsback-api',
    saveDaysAmount: 7
  }
};

const api = new API(options);

api.getBalance()
  .then(v => console.log('Response', v))
  .catch(v => console.log('Error', v));
```
