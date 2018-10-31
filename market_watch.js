const https = require('https')
const axios = require('axios')
const client = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})
/**
 * In this example, we will try to emulate a market watcher that specifies how much
 * can i generate in a certain currency with a given amount of money.
 * 
 * Given that the APIs needed are public, you can check it against production.
 * 
 * This is a naive approach that works fine with small amounts but is not precise for larger ones.
 * For a more complex and precise example, see market_watch_precise.js
 */

// const API_URL = 'https://bitex.la/api'
const API_URL = 'https://localhost:3000/api'

//STEP 1: Define values
//Possible currencies are 'usd', 'ars', 'clp', 'pyg', 'uyu'
const CURRENCY_FROM = 'usd'
const CURRENCY_TO = 'ars'
const AMOUNT = 100
console.log(`Starting the process to transform ${AMOUNT} ${CURRENCY_FROM.toUpperCase()} to ${CURRENCY_TO.toUpperCase()}`)

async function main() {
  //STEP 2: Get market price to buy BTC
  console.log(`Fetching best ask in market BTC/${CURRENCY_FROM.toUpperCase()}`)
  /**
   * Response example:
   * { 
   *  "data": {
   *    "id":"btc_usd",
   *    "type":"tickers",
   *    "attributes": {
   *      "last": 6288.66,
   *      "open": 6273.95,
   *      "high": 6338.0,
   *      "low": 6218.0,
   *      "vwap": 6279.63860694001, (Volume Weighted Average Price)
   *      "volume": 22.47849871, (Last 24hs operated Volume)
   *      "bid": 6291.65,
   *      "ask": 6317.19,
   *      "price_before_last": 6298.14
   *    }
   *  }
   * }
   */
  let response = await client.get(`${API_URL}/tickers/btc_${CURRENCY_FROM}`)
  const askValue = response.data.data.attributes.ask
  console.log(`Ask value is: ${askValue}`)

  //STEP 3: Get market price to sell BTC
  console.log(`Fetching best bid in market BTC/${CURRENCY_TO.toUpperCase()}`)
  let bidResponse = await client.get(`${API_URL}/tickers/btc_${CURRENCY_TO}`)
  const bidValue = response.data.data.attributes.bid
  console.log(`Bid value is: ${bidValue}`)

  //STEP 4: Calculate value
  const generatedValue = (AMOUNT/askValue) * bidValue
  console.log(`${AMOUNT} ${CURRENCY_FROM.toUpperCase()} would generate ${generatedValue} ${CURRENCY_TO.toUpperCase()}`)
}

main()