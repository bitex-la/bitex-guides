const client = require('./HttpClient')
const sleep = require('await-sleep')
/**
 * In this example, we will try to emulate a remittance operation.
 *
 * This operation is divided in four steps:
 * 1. Deposit cash
 *   1.1 Get Deposit Instructions
 *   1.2 Watch the balance until the deposit is accredited
 * 2. Buy BTC
 * 3. Sell BTC in a different currency
 * 4. Withdraw
 *   4.1 Create Withdrawal Instructions
 *   4.2 Create Cash Withdrawal
 *   4.3 Watch the Withdrawal until it is settled.
 *
 * In this example, we will use buying and selling bots to perform the trading
 * actions, given that their strategy is optimized to get a better price than
 * doing it manually.
 */

const API_URL = 'https://bitex.la/api'
const YOUR_API_KEY = 'your_api_key'

const AMOUNT = 100000
const CURRENCY_FROM = 'ars'
const CURRENCY_TO = 'clp'

function findOrderbook(response, currency){
  return response.data.data.find((o) => o.attributes.quote.code == currency)
}

function getBalanceForCurrency(response, currency){
  return response.data.data[0].attributes.balances[currency].available
}

async function main() {
  //Step 1.1: Get Deposit Instructions
  console.log('Fetching deposit instructions')
  let response = await client.get(`${API_URL}/cash_deposit_instructions`, {
    headers: { 'Authorization': YOUR_API_KEY }
  })
  //This instructions are human-readable only. You should not notify us in any
  //way about your deposit. Once it's accredited into our bank account, we will 
  //reflect your balance accordingly.
  console.log(`The instructions to deposit ${CURRENCY_FROM.toUpperCase()} are:
    ${response.data.data.find(
      (instr) => instr.id == CURRENCY_FROM
    ).attributes.instructions}`)

  //Step 1.2: Watch the balance until the deposit is accredited
  let balance = 0
  while(!balance){
    await sleep(1000)

    console.log(`Checking balance.`)
    let response = await client.get(
      `${API_URL}/accounts`, {
      headers: { 'Authorization': YOUR_API_KEY }
    })
    balance = getBalanceForCurrency(response, CURRENCY_FROM)
    console.log(`Current balance in ${CURRENCY_FROM.toUpperCase()}: ${balance}`)
  }

  console.log('Deposit accredited. Proceeding to buy BTC')
  //Step 2: Buy BTC
  console.log('Fetching orderbook')
  let orderbooksResponse = await client.get(`${API_URL}/orderbooks`)
  let IdOrderbookFrom = findOrderbook(orderbooksResponse, CURRENCY_FROM).id
  let IdOrderbookTo = findOrderbook(orderbooksResponse, CURRENCY_TO).id
  console.log(`ID Orderbook From is ${IdOrderbookFrom}`)
  console.log(`ID Orderbook To is ${IdOrderbookTo}`)

  console.log('Creating buying bot')
  let buyingBotResponse = await client.post(`${API_URL}/buying_bots`,
    {
      "data": {
        "type": "buying_bots",
        "attributes": {
          "amount": balance
        },
        "relationships": {
          "orderbook": {
            "data": {
              "id": IdOrderbookFrom,
              "type": "orderbooks"
            }
          }
        }
      }
    },
    {headers: { 'Authorization': YOUR_API_KEY }}
  )
  console.log(`Buying bot created with id ${buyingBotResponse.data.data.id}`)

  while(buyingBotResponse.data.data.attributes.remaining_amount){
    await sleep(1000)

    console.log(`Checking buying bot.`)
    buyingBotResponse = await client.get(
      `${API_URL}/buying_bots/${buyingBotResponse.data.data.id}`, {
      headers: { 'Authorization': YOUR_API_KEY }
    })
    console.log(`Remaining amount to buy: \
    ${buyingBotResponse.data.data.attributes.remaining_amount}`)
  }
  console.log('Finished buying BTC')

  //Getting how much BTC was generated
  let btcBalanceResponse = await client.get(
    `${API_URL}/accounts`, {
    headers: { 'Authorization': YOUR_API_KEY }
  })
  let btcBalance = getBalanceForCurrency(btcBalanceResponse, "btc")
  console.log(`Current balance in BTC: ${btcBalance}`)

  //Step 3: Selling BTC
  console.log('Creating selling bot')
  let sellingBotResponse = await client.post(`${API_URL}/selling_bots`,
    {
      "data": {
        "type": "selling_bots",
        "attributes": {
          "amount": btcBalance
        },
        "relationships": {
          "orderbook": {
            "data": {
              "id": IdOrderbookTo,
              "type": "orderbooks"
            }
          }
        }
      }
    },
    { headers: { 'Authorization': YOUR_API_KEY } }
  )
  console.log(`Selling bot created with id ${sellingBotResponse.data.data.id}`)

  while(sellingBotResponse.data.data.attributes.remaining_amount){
    await sleep(1000)

    console.log(`Checking selling bot.`)
    sellingBotResponse = await client.get(
      `${API_URL}/selling_bots/${sellingBotResponse.data.data.id}`, {
      headers: { 'Authorization': YOUR_API_KEY }
    })
    console.log(`Remaining amount to sell: \
    ${sellingBotResponse.data.data.attributes.remaining_amount}`)
  }
  console.log('Finished selling BTC')

  //Getting how much money was generated on the other side
  let finalBalanceReponse = await client.get(
    `${API_URL}/accounts`, {
    headers: { 'Authorization': YOUR_API_KEY }
  })
  let finalBalance = getBalanceForCurrency(finalBalanceReponse, CURRENCY_TO)
  console.log(`Generated ${finalBalance} ${CURRENCY_TO.toUpperCase()}`)

  //Step 4: Withdraw

  //Step 4.1: Create Withdrawal Instructions
  console.log('Creating Withdrawal Instructions')
  let withdrawalInstructionsResponse = await client.post(
    `${API_URL}/withdrawal_instructions`,
    {
      "data": {
        "type": "withdrawal_instructions",
        "attributes": {
          "label": "Local Bank",
          "body": {
            "name": "John Doe",
            "city": "Santiago",
            "phone": "12341234",
            "cuit": "12341234",
            "address": "My Address 123",
            "bank": "itau_chile",
            "bank_account_number": "12341234",
            "cbu": "1234123412341234",
            "account_type": "savings",
            "currency": CURRENCY_TO,
            "country": "CL",
            "payment_method": "domestic_bank"
          }
        }
      }
    },
    { headers: { 'Authorization': YOUR_API_KEY } }
  )

  //Step 4.2: Request Withdrawal
  let withdrawalResponse = await client.post(`${API_URL}/cash_withdrawals`, {
    "data": {
      "type": "cash_withdrawals",
      "attributes": {
        "amount": finalBalance,
        "fiat": CURRENCY_TO
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

  //Step 4.3: Consulting Withdrawal status
  while(withdrawalResponse.data.data.attributes.status === 'received'){
    await sleep(1000)

    console.log(`Checking withdrawal status.`)
    withdrawalResponse = await client.get(
      `${API_URL}/cash_withdrawals/${withdrawalResponse.data.data.id}`, {
      headers: { 'Authorization': YOUR_API_KEY }
    })
    console.log(`Current Withdrawal status is: \
    ${withdrawalResponse.data.data.attributes.status}`)
  }
  console.log('Withdrawal done')

  console.log('End of Remittance')
}

main()