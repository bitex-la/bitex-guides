const client = require('./HttpClient')
/**
 * In this example, we will try to emulate a market watcher that compares Bitex
 * price of BTC in USD with the one given by Coindesk.
 * 
 * Given that the APIs needed are public, you can check it against production.
 * 
 * This is a naive approach that works fine with small amounts but is not precise for larger ones.
 * For a more complex and precise example, see market_watch_precise.js
 */

const API_URL = 'https://bitex.la/api'

async function main() {
  //STEP 1: Get Bitex ticker from BTC/USD market
  console.log(`Fetching Bitex Ticker`)
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
  let response = await client.get(`${API_URL}/tickers/btc_usd`)
  const bitexPrice = response.data.data.attributes.last
  console.log(`Bitex last price is: ${bitexPrice}`)

  //STEP 2: Get Coindesk current price
  console.log(`Fetching Coindesk ticker`)
  let coindeskResponse = await client.get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
  const coindeskPrice = coindeskResponse.data.bpi.USD.rate_float
  console.log(`Coindesk price is: ${coindeskPrice}`)

  //STEP 3: Display the difference
  const proportion = (bitexPrice/coindeskPrice)
  if (proportion > 1){
    console.log(`Bitex is ${(proportion - 1) * 100}% more expensive`)
  } else if (proportion < 1) {
    console.log(`Bitex is ${(1 - proportion) * 100}% cheaper`)
  } else {
    console.log('Price is exactly the same')
  }
}

main()