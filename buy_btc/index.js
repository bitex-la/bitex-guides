const client = require('./HttpClient')
const sleep = require('await-sleep')
/**
 * In this example, we will try to emulate a buying operation.
 * 
 * This is an improved approach that works well with large amounts.
 * If the precise price is not needed, or you are planning to buy a small amount
 * you can just get the ticker of the market and check its best ask.
 * 
 * In this example, we get the whole orderbook to see how deep in the list we
 * should go to buy the whole required amount in one shot.
 * 
 * We also have buying and selling bots, in case you prefer to perform the 
 * buying in smaller chunks. It may get you a better deal.
 */

const API_URL = 'https://bitex.la/api'
const YOUR_API_KEY = 'your_api_key'

const AMOUNT = 100000
const CURRENCY = 'usd'

async function main() {
  //Get the orderbook asks
  console.log(`Fetching BTC/${CURRENCY.toUpperCase()} Orderbook`)
  let response = await client.get(`${API_URL}/markets/btc_${CURRENCY}`)
  //We recommend to use a JSONAPI specific client to avoid this attribute chain
  const asks = response.data.data.relationships.asks.data 
  const fullAsks = asks.map(
    (ask) => response.data.included.find((item) => item.id == ask.id).attributes
  )
  console.log('Asks values are:')
  console.log(fullAsks)

  console.log('------------------------------------------')

  //Calculate how much would it take to operate such order
  console.log(`Calculating depth of orderbook`)
  let remaining = AMOUNT
  let received = 0
  let ordersMatched = 0
  let maxPrice = 0
  while (remaining && ordersMatched < fullAsks.length) {
    const ask = fullAsks[ordersMatched]
    const value = ask.price * ask.amount
    if (remaining > value) {
      // I will have to go deeper in the orderbook
      remaining -= value
      received += ask.amount
    } else {
      maxPrice = ask.price
      received += remaining / ask.price
      remaining = 0
    }
    ordersMatched++
  }

  if (remaining) {
    console.log('There aren\'t enough orders to match the requested amount')
  }
  console.log(`You can buy ${received.toFixed(8)} BTC at an average price of ` +
    `${((AMOUNT - remaining) / received).toFixed(2)} matching ` + 
    `${ordersMatched} order${(ordersMatched > 1 ? 's' : '')}`
  )

  //Assuming that the estimated received amount is ok for you, we proceed to do
  //the actual buying.

  let bidCreationResponse = await client.post(
    `${API_URL}/markets/btc_${CURRENCY}/bids`,
    {
      "data": {
          "type": "bids",
          "attributes": {
              "amount": AMOUNT,
              "price": maxPrice
          }
      }
    },
    {
      headers: { 'Authorization': YOUR_API_KEY }
    }
  )
  const bidId = bidCreationResponse.data.data.id
  console.log(`Bid created with id ${bidId}`)

  let bidStatus
  let retries = 0
  while(bidStatus !== 'done' && retries < 10){
    await sleep(1000)

    console.log(`Checking status. Try number: ${retries}`)
    let response = await client.get(
      `${API_URL}/markets/btc_${CURRENCY}/bids/${bidId}`, {
      headers: { 'Authorization': YOUR_API_KEY }
    })
    bidStatus = response.data.data.attributes.status
    console.log(`Current status of bid: ${bidStatus}`)
    retries++
  }

  if (bidStatus === 'pending') {
    console.log('The bid is still pending. This is probably because the ' +
      'orders were taken previously by another buyer')
    console.log('Proceeding to cancel the bid')

    await client.post(
      `${API_URL}/markets/btc_${CURRENCY}/bids/cancel`,
      [
        {
          "data": {
              "type": "bids",
              "id": bidId
          }
        }
      ],
      {
        headers: { 'Authorization': YOUR_API_KEY }
      }
    )
    console.log('Bid cancelled')
  }
}

main()