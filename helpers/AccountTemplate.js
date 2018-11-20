function getAccountTemplateData(balances = {}) {
  let data = {
    "data": [
      {
        "id": "8",
        "type": "accounts",
        "attributes": {
          "balances": {
            "btc": {
              "total": 0,
              "available": 0
            },
            "usd": {
              "total": 0,
              "available": 0
            },
            "ars": {
              "total": 0,
              "available": 0
            },
            "clp": {
              "total": 0,
              "available": 0
            },
            "bch": {
              "total": 0,
              "available": 0
            },
            "pyg": {
              "total": 0,
              "available": 0
            },
            "uyu": {
              "total": 0,
              "available": 0
            }
          },
          "country": "AR"
        },
        "relationships": {
            "movements": {
                "data": []
            },
            "pending_movements": {
                "data": []
            },
            "user": {
                "data": {
                    "id": "8",
                    "type": "users"
                }
            }
        }
      }
    ],
    "included": [
      {
        "id": "8",
        "type": "users",
        "attributes": {
          "name": "John Doe",
          "email": "johndoe@gmail.com",
          "kyc_accepted": true,
          "otp_enabled": true,
          "kyc_pending": false,
          "do_not_email": false,
          "trezor_login_enabled": false
        }
      }
    ]
  }
  if (Object.keys(balances).length) {
    for(let currency in balances){
      data.data[0].attributes.balances[currency] = {
        "total": balances[currency],
        "available": balances[currency]
      }
    }
  }
  return data
}

module.exports = getAccountTemplateData
