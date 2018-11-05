const client = require('./HttpClient')
const sleep = require('await-sleep')
/**
 * In this example, we will try to emulate an ecommerce receiving payments in
 * BTC.
 * 
 * In this example, we show how to create a payment and watch until it is
 * performed by the user. This process should be repeated each time the commerce
 * intentd to receive a payment in BTC.
 * 
 * The payment will be marked as done when the transaction is propagated in the
 * Bitcoin network. This should take ~10 seconds at most.
 */

const API_URL = 'https://bitex.la/api'
const YOUR_API_KEY = 'your_api_key'

const AMOUNT = 10000
const CURRENCY = 'ARS'
const KEEP = 10 //Keep 10 percent in BTC

/**
 * This map of currency <-> id is taken from the Create Payment endpoint
 * documentation
 */
const currencies = {
  'BTC': 1,
  'USD': 3,
  'ARS': 4,
  'UYU': 5,
  'EUR': 6,
  'CLP': 7,
  'PEN': 8,
  'BRL': 9,
  'COP': 10,
  'MXN': 11,
  'PYG': 12,
  'CNY': 13,
  'INR': 14,
  'BCH': 16,
}

async function main() {
  console.log(`Creating a payment to receive ${AMOUNT} ${CURRENCY}`)
  let response = await client.post(`${API_URL}/merchants/payments`, {
    "data": {
      "type": "payments",
      "attributes": {
        "amount": AMOUNT,
        "currency": currencies[CURRENCY],
        "keep": KEEP,
        "callback_url": "https://mystore.com/webhook",
        "customer_reference": "Purchase at My Store",
        "merchant_reference": "Sale id: 2212"
      }
    }
  }, { headers: { 'Authorization': YOUR_API_KEY } })

  const paymentId = response.data.data.id
  console.log(`Payment created with id ${paymentId}`)

  const btcAddress = response.data.included[0].attributes.public_address
  console.log(`BTC Address to show the customer: ${btcAddress}`)

  console.log('------------------------------------------')

  let paymentStatus = response.data.data.attributes.status
  while(paymentStatus !== 'done'){
    await sleep(1000)

    console.log('Checking payment status.')
    let response = await client.get(
      `${API_URL}/merchants/payments/${paymentId}`, {
      headers: { 'Authorization': YOUR_API_KEY }
    })
    paymentStatus = response.data.data.attributes.status
    console.log(`Current status of payment: ${paymentStatus}`)
  }

  console.log('The payment was successfully received.')

  //Getting how much money was generated on the other side
  let balanceResponse = await client.get(
    `${API_URL}/accounts`, {
    headers: { 'Authorization': YOUR_API_KEY }
  })

  //No matter in which currency was requested the payment, it will be accredited
  //into the merchant's account in USD, until further notice.
  let balance = balanceResponse.data.data[0].attributes.balances.usd.available
  console.log(`Generated ${balance} USD`)

  console.log('------------------------------------------')
  console.log('Starting Withdrawal process')

  //Create Withdrawal Instructions
  console.log('Creating Withdrawal Instructions')
  let withdrawalInstructionsResponse = await client.post(
    `${API_URL}/withdrawal_instructions`,
    {
      "data": {
        "type": "withdrawal_instructions",
        "attributes": {
          "label": "USD Savings Account",
          "body": {
            "name": "John Doe",
            "city": "Buenos Aires",
            "phone": "12341234",
            "cuit": "12341234",
            "address": "My Address 123",
            "bank": "bco_galicia",
            "bank_account_number": "12341234",
            "cbu": "1234123412341234",
            "account_type": "savings",
            "currency": "USD",
            "country": "AR",
            "payment_method": "domestic_bank"
          }
        }
      }
    },
    { headers: { 'Authorization': YOUR_API_KEY } }
  )

  //Request Withdrawal
  let withdrawalResponse = await client.post(`${API_URL}/cash_withdrawals`, {
    "data": {
      "type": "cash_withdrawals",
      "attributes": {
        "amount": balance,
        "fiat": 'USD'
      },
      "relationships": {
        "withdrawal_instruction": {
          "data": {
            "id": withdrawalInstructionsResponse.data.data.id,
            "type": "withdrawal_instructions"
          }
        }
      }
    }
  })
  console.log('Withdrawal requested. End of process')
}

main()