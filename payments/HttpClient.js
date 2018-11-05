const https = require('https')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const getAccountTemplateData = require('../helpers/AccountTemplate')

function buildPaymentData(status = "pending") {
  return {
    "data": {
      "id": "3",
      "type": "payments",
      "attributes": {
        "amount": 1000.0,
        "confirmed_quantity": 0.0,
        "currency": "ars",
        "customer_reference": "Purchase at My Store",
        "expected_quantity": 1000.0,
        "keep": 10.0,
        "kept": null,
        "last_quoted_on": "2018-06-14T18:27:59.166Z",
        "merchant_reference": "Sale id: 2212",
        "overpaid": null,
        "quote_valid_until": "2018-06-14T19:27:59.151Z",
        "settlement_amount": null,
        "settlement_currency": null,
        "status": status,
        "unconfirmed_quantity": 0.0,
        "valid_until": "2018-06-14T19:27:59.151Z"
      },
      "relationships": {
        "address": {
          "data": {
            "id": "143",
            "type": "bitcoin_addresses"
          }
        }
      }
    },
    "included": [{
      "id": "143",
      "type": "bitcoin_addresses",
      "attributes": {
        "auto_sell": false,
        "public_address": "mnB4AQSyFgM94Mw3EYJSHFeKsd6Stwor3Z"
      },
      "relationships": {
        "user": {
          "data": {
            "id": "8",
            "type": "users"
          }
        }
      }
    }]
  }
}

let mock = new MockAdapter(axios)
.onPost('https://bitex.la/api/merchants/payments').reply(200, buildPaymentData())
.onGet('https://bitex.la/api/merchants/payments/3').replyOnce(200,buildPaymentData())
.onGet('https://bitex.la/api/merchants/payments/3').replyOnce(200,buildPaymentData("done"))
.onGet('https://bitex.la/api/accounts').replyOnce(200, 
  getAccountTemplateData({"usd": 250, "btc": 0.004})
)
.onPost('https://bitex.la/api/withdrawal_instructions').reply(200, {
  "data": {
    "id": "23",
    "type": "withdrawal_instructions",
    "attributes": {
      "label": "Local Bank",
      "schema": "bitex",
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
        "currency": "ARS",
        "country": "AR",
        "payment_method": "domestic_bank"
      }
    }
  }
})
.onPost('https://bitex.la/api/cash_withdrawals').reply(200, {
  "data": {
    "id": "29",
    "type": "cash_withdrawals",
    "attributes": {
      "status": "received",
      "amount": 60000.0,
      "country": "AR",
      "payment_method": "domestic_bank",
      "currency": "CLP",
      "label": "Local Bank",
      "created_at": "2018-06-06T17:05:19.024Z"
    },
    "relationships": {
      "withdrawal_instruction": {
        "data": {
          "id": "22",
          "type": "withdrawal_instructions"
        }
      }
    }
  },
  "included": [{
    "id": "22",
    "type": "withdrawal_instructions",
    "attributes": {
      "label": "Local Bank",
      "schema": "bitex",
      "body": {
        "name": "John Doe",
        "city": "Buenos Aires",
        "phone": "12341234",
        "cuit": "12341234",
        "address": "My Address 123",
        "bank": "hsbc",
        "bank_account_number": "12341234",
        "cbu": "1234123412341234",
        "account_type": "savings",
        "currency": "ARS",
        "country": "AR",
        "payment_method": "domestic_bank"
      }
    }
  }]
})
.onAny().passThrough()

let client = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

module.exports = client