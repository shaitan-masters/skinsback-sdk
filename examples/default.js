const { API } = require('./../js');

const options = {
  secret_key: '', // Insert your secret-key from panel
  shop_id: 0 // Insert your shop-id from panel
};

const api = new API(options);

api.getBalance()
  .then(v => console.log('Response', v))
  .catch(v => console.log('Error', v));