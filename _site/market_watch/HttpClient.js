const https = require('https')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

let mock = new MockAdapter(axios)

mock.onGet('https://bitex.la/api/tickers/btc_usd').reply(200, {
  "data": {
    "id":"btc_usd",
    "type":"tickers",
    "attributes": {
      "last": 6288.66,
      "open": 6273.95,
      "high": 6338.0,
      "low": 6218.0,
      "vwap": 6279.63860694001,
      "volume": 22.47849871,
      "bid": 6291.65,
      "ask": 6317.19,
      "price_before_last": 6298.14
    }
  }
}).onAny().passThrough()

let client = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

module.exports = client