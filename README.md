##Node module for [skinsback.com](https://skinsback.com) API.
## Installation

`npm install skinsback-sdk`

##Usage
```javascript
const API = require('skinsback-sdk').API;
```
or
```javascript
import {API} from 'skinsback-sdk';
````
##Contructor options

- `options[shop_id]`: your shop_id key **required**
- `options[secret_key]`: Your personal `secret key` for generate signature. [More about generate signature](https://skinsback.com/profile.php?act=api&item=signature).
- `options[apiUrl]`: url to API. *Default: `https://skinsback.com/api.php`.*

####Example
```javascript
import {API} from 'skinsback-sdk';

const options = {
    shop_id: 1490,
    secret_key: 'XCvlP45Y2dH2UmHhkl1'
}

const api = new API(options);
```

## Api methods
All methods of api return a Promise.
* [Проверка баланса на сайте](https://skinsback.com/profile.php?act=api&item=balance) 
```javascript
api.getBalance() 
```
* [Получени5е валют и курсов](https://skinsback.com/profile.php?act=api&item=currencies) 
```javascript
api.getCurrencies() 
```
* [Получение списка депозитов](https://skinsback.com/profile.php?act=api&item=orders) 
```javascript
const params = {
    starting: 15123132, /// Unix time начала
    ending: 15125832   /// Unix time конца
}
api.getOrders(params) 
```
* [Проверка статуса заказа по ID транзакции](https://skinsback.com/profile.php?act=api&item=orderstatus) 
```javascript
const transaction_id = 65236
api.getOrderStatusByTransactionId(transaction_id) 
```
* [Проверка статуса заказа по ID заказа](https://skinsback.com/profile.php?act=api&item=orderstatus) 
```javascript
const order_id = 636
api.getOrderStatusByOrderId(order_id) 
```
* [Создание заказа](https://skinsback.com/profile.php?act=api&item=createorder) 
```javascript
const order_id = 636 ///Уникальный ID заказа в вашей системе
api.createOrder(order_id) 
```
* [Статус сервера](https://skinsback.com/profile.php?act=api&item=status) 
```javascript
api.serverStatus() 
```
* [Получение списка недошедших Callback](https://skinsback.com/profile.php?act=api&item=callback_errors) 
```javascript
api.getErrorCallbackList() 
```
* [МАРКЕТ: Прайслист (Наличие скинов)](https://skinsback.com/profile.php?act=api&item=market_pricelist) 
```javascript
const game = 'csgo' // Game types 'dota2' or 'csgo'. Default: 'csgo'
api.getMarketPriceList([game]) 
```
* [МАРКЕТ: Поиск скинов по названию](https://skinsback.com/profile.php?act=api&item=market_search) 
```javascript
const name = 'FAMAS' // name of skin
const game = 'csgo' // Game types 'dota2' or 'csgo'. Default: 'csgo'
api.getMarketPriceList(name, [game]) 
```
* [МАРКЕТ: Покупка скина по имени вещи и отправка юзеру](https://skinsback.com/profile.php?act=api&item=market_buy) 
```javascript
const name = 'FAMAS' // name of skin
const game = 'csgo' // Game types 'dota2' or 'csgo'. Default: 'csgo'
api.buyItemByNameAndSendToUser(name, [game]) 
```
* [МАРКЕТ: Покупка скина по ID вещи и отправка юзеру](https://skinsback.com/profile.php?act=api&item=market_buy) 
```javascript
const params = {
    partner: string, // Значение partner из Trade URL пользователя
    token: string, // Значение token из Trade URL пользователя
    max_price: number, // Максимальная стоимость скина для покупки (в USD). Используется как ограничитель стоимости.
    name: string, // Название скина (market hash name)
    game: string // Game types 'dota2' or 'csgo'. Default: 'csgo'
}
api.buyItemByIdAndSendToUser(params) 
```
* [МАРКЕТ: ИНФОРМАЦИЯ О ПОКУПКЕ](https://skinsback.com/profile.php?act=api&item=market_getinfo) 
```javascript
const buy_id = 12354322 /// buy_id из метода buyItemByIdAndSendToUser или buyItemByNameAndSendToUser
api.getInfoAboutBoughtItem(buy_id) 
```
* [МАРКЕТ: История покупок](https://skinsback.com/profile.php?act=api&item=market_history) 
```javascript
const params = {
    starting: 15123132, /// Unix time начала
    ending: 15125832   /// Unix time конца
}
api.getBoughtItemsHistory(params) 
```

## WebScokets
Получение real-time изменений по приобретенным скинами.

##Usage
```javascript
const WebSockets = require('skinsback-sdk').WebSockets;
```
or
```javascript
import {WebSockets} from 'skinsback-sdk';
````
##Contructor options

- `options[shop_id]`: your shop_id key **required**
- `options[secret_key]`: Your personal `secret key` for generate signature. [More about generate signature](https://skinsback.com/profile.php?act=api&item=market_websocket).

####Example
```javascript
import {WebSockets} from 'skinsback-sdk';

const options = {
    shop_id: 1490,
    secret_key: 'XCvlP45Y2dH2UmHhkl1'
}

const sockets = new WebSockets(options);
```
## WebSockets methods
* [Подписка на события сокетов](https://skinsback.com/profile.php?act=api&item=market_websocket)
(Данные приходящие по сокетам попадают в аргумент callback функции уже в виде распаршенного объекта)
```javascript
sockets.subscribe(data => console.log(data));
```
* Вызов callback функции при подключении к сокетам 
```javascript
const cb = () => console.log('Connected')
sockets.connect(cb) 
```
* Вызов callback функции при отключении от сокетов 
```javascript
const cb = () => console.log('Disconnected')
sockets.disconnect(cb)
```
