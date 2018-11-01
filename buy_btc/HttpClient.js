const https = require('https')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

let mock = new MockAdapter(axios)

mock.onGet('https://bitex.la/api/markets/btc_usd').reply(200, {
  "data": {
    "id": "btc_usd",
    "type": "markets",
    "relationships": {
      "candles": {
        "data": [
          {
            "id": "1528226822",
            "type": "candles"
          }
        ]
      },
      "transactions": {
        "data": []
      },
      "bids": {
        "data": [
          {
            "id": "12560.29",
            "type": "order_groups"
          },
          {
            "id": "12550.00",
            "type": "order_groups"
          }
        ]
      },
      "asks": {
        "data": [
          {
            "id": "12984.76",
            "type": "order_groups"
          },
          {
            "id": "13000.00",
            "type": "order_groups"
          },
          {
            "id": "13222.22",
            "type": "order_groups"
          }
        ]
      }
    }
  },
  "included": [
    {
      "id": "1528226822",
      "type": "candles",
      "attributes": {
        "timestamp": 1528226822,
        "last": 12447.26,
        "open": 11033,
        "high": 12859.44,
        "low": 10989.62,
        "vwap": 11828.68,
        "volume": 25.83484738,
        "price_before_last": 12385.75
      }
    },
    {
      "id": "12560.29",
      "type": "order_groups",
      "attributes": {
        "price": 12560.29,
        "amount": 10
      }
    },
    {
      "id": "12550.00",
      "type": "order_groups",
      "attributes": {
        "price": 12550,
        "amount": 1.32
      }
    },
    {
      "id": "12984.76",
      "type": "order_groups",
      "attributes": {
        "price": 12984.76,
        "amount": 0.83736383
      }
    },
    {
      "id": "13000.00",
      "type": "order_groups",
      "attributes": {
        "price": 13000,
        "amount": 2
      }
    },
    {
      "id": "13222.22",
      "type": "order_groups",
      "attributes": {
        "price": 13222.22,
        "amount": 1.1
      }
    }
  ]
})
.onPost('https://bitex.la/api/markets/btc_usd/bids').reply(200, {
  "data": {
    "id": "2",
    "type": "bids",
    "attributes": {
        "amount": 100000,
        "remaining_amount": 100000,
        "price": 13222.22,
        "status": "pending"
    }
  }
})
//To get a forever-pending bid, replace the following line with:
// .onGet('https://bitex.la/api/markets/btc_usd/bids/2').reply(200, {
.onGet('https://bitex.la/api/markets/btc_usd/bids/2').replyOnce(200, {
  "data": {
    "id": "2",
    "type": "bids",
    "attributes": {
        "amount": 100000,
        "remaining_amount": 50000,
        "price": 13222.22,
        "status": "pending"
    }
  }
})
// To get a forever-pending bid, comment out the next mock
.onGet('https://bitex.la/api/markets/btc_usd/bids/2').replyOnce(200, {
  "data": {
    "id": "2",
    "type": "bids",
    "attributes": {
        "amount": 100000,
        "remaining_amount": 100000,
        "price": 13222.22,
        "status": "done"
    }
  }
})
.onPost('https://bitex.la/api/markets/btc_usd/bids/cancel').reply(200)
.onAny().passThrough()

let client = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

module.exports = client