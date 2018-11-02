const https = require('https')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

let mock = new MockAdapter(axios)

function getAccountTemplateData(preFilledCurrency = '', amount = 0) {
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
  if (preFilledCurrency) {
    data.data[0].attributes.balances[preFilledCurrency] = {
      "total": amount,
      "available": amount
    }
  }
  return data
}

mock.onGet('https://bitex.la/api/cash_deposit_instructions').reply(200, {
  "data": [
    {
      "id": "usd",
      "type": "cash_deposit_instructions",
      "attributes": {
        "currency": "usd",
        "instructions": "<br/> - Una vez acreditada la transferencia local, \
          procederemos a cargar el saldo en tu cuenta, que tendrás disponible \
          para ejecutar en el mercado BTC/USD administrado por Bitex \
          International.<br/> - Para agilizar la acreditación te recomendamos \
          no enviar montos redondos: 10001.40 es mejor que 10000.0 <br/> - Tu \
          pago puede tardar hasta 72hs hábiles en acreditarse.<br/> - El pago \
          se acreditará automáticamente. Si pasado el plazo de 72 hs. hábiles \
          aún no ves acreditado tu depósito, comunicate con nosotros<br/> <br/>\
          Mínimo: 5 USD.<br/> <hr/> Desde Argentina:<br/> <strong> BITEX SRL \
          <br/> CUIT: 30-71508120-9 <br/> <br/> Banco Industrial - Sucursal \
          Central <br/> CBU U$D: 3220001812006112540026<br/> Alias: \
          BITCOIN.MINORISTA.US<br/> <br/> Banco Comafi<br/> CBU U$D: \
          2990000000014744190213<br/> </strong> <br/> Impuestos: Bitex es \
          sujeto gravado por el impuesto al débito/crédito por lo que del \
          importe transferido se le debitará el 0.6% del importe bruto.<br> \
          <br/> <hr/> Desde Paraguay:<br/> <strong> BITEX PARAGUAY SA<br/> \
          RUC: 80101016-0 <br/> <br/> BANCO VISION<br/> Caja de Ahorro: \
          9580820<br/> </strong> <br/> <hr/> Desde Uruguay:<br/> <strong> \
          Próximamente<br/> </strong> <br/> Por el momento puedes enviarnos un \
          mail a hola@bitex.la y te contaremos cómo hacer para transferir.<br/>\
          <br/> <hr/> Desde EEUU:<br/> <strong> Beneficiary Bank: Union Bank & \
          Trust<br/> Bank Address: 24010 Partnership Boulevard, Ruther Glen, \
          VA 22546<br/> Beneficiary ABA: 051403164<br/> Acc. #: 8515642944<br/>\
          <br/> Beneficiary: EPTC Custodial Trust<br/> Beneficiary Address: 155\
          Broadview Avenue, 2 nd Floor, Warrenton, VA 20186<br/> <br/>\
          <span class = 'text-danger'> REF: FBO BITEX INTERNATIONAL (incluir \
          esta referencia en el wire es de carácter obligatorio y cualquier \
          transferencia que no la incluya será rechazada)<br/> El Union Bank & \
          Trust cobra USD 65 por cada wire recibido, que serán debitados del \
          monto neto recibido en nuestra cuenta.<br/> </span> </strong> Sólo \
          aceptaremos transferencias bancarias locales desde los EEUU. \
          Cualquier transferencia recibida internacional será rechazada. <br/> \
          <hr/> Desde otra parte del mundo:<br/> <strong> Contactános a \
          hola@bitex.la para recibir nuestras instrucciones bancarias.<br/> \
          Por favor, comentanos en el mail desde qué país quisieras hacer la \
          transferencia y el monto de la misma.<br/> </strong> <br/> Mínimo: \
          15000 USD.<br/> Las transferencias internacionales, una vez recibidas\
          por nuestro banco o intermediario de pago pueden tardar hasta 5 días \
          hábiles en acreditarse en tu balance.<br/> <br/> Algunas \
          consideraciones a la hora de transferir:<br/> \
          <span class='text-danger'>Solo podemos aceptar transferencias \
          provenientes del titular de la cuenta, no puedes hacer que un tercero\
          transfiera en tu cuenta de Bitex.la</span> <br/> Las transferencias \
          son procesadas de Lunes a Viernes. <br/> Todos los costos asociados \
          corren a tu cargo."
      }
    },
    {
      "id": "ars",
      "type": "cash_deposit_instructions",
      "attributes": {
        "currency": "ars",
        "instructions": "<br/> - Una vez acreditada la transferencia local, \
          procederemos a cargar el saldo en tu cuenta, que tendrás disponible \
          para ejecutar en el mercado BTC/ARS administrado por Bitex \
          International. <br/> - Para agilizar la acreditación te recomendamos \
          no enviar montos redondos: 10001.40 es mejor que 10000.0 <br/> - Tu \
          pago puede tardar hasta 72 hs. hábiles en acreditarse.<br/> - El pago\
          se acreditará automáticamente. Si pasado el plazo de 72 hs. hábiles \
          aún no ves acreditado tu depósito, comunicate con nosotros<br/> \
          <br/> Mínimo: 100 ARS.<br/> <br/> <strong> BITEX S.R.L: CUIT: \
          30-71508120-9 <br/> Banco Industrial - Sucursal Central <br/> CBU: \
          3220001805006112540015<br/> ALIAS: BITCOIN.MINORISTA.AR<br/> \
          </strong> <br/> Impuestos: Bitex es sujeto gravado por el impuesto \
          al debito/crédito por lo que del importe transferido se le debitará \
          el 0.6% del importe bruto recibido.<br> <br/> Algunas consideraciones\
          a la hora de transferir:<br/> <span class='text-danger'>Solo podemos \
          aceptar transferencias provenientes del titular de la cuenta, no \
          puedes hacer que un tercero transfiera en tu cuenta de \
          Bitex.la</span> <br/> Las transferencias son procesadas de Lunes a \
          Viernes. <br/> Una vez recibida por nuestro banco o intermediario de \
          pago puede tardar 24 horas hábiles en acreditarse en tu balance. \
          <br/> Todos los costos asociados corren a tu cargo."
      }
    },
    {
      "id": "clp",
      "type": "cash_deposit_instructions",
      "attributes": {
        "currency": "clp",
        "instructions": "<br/> - Una vez acreditada la transferencia local, \
          procederemos a cargar el saldo en tu cuenta, que tendrás disponible \
          para ejecutar en el mercado BTC/CLP administrado por Bitex \
          International.<br/> - Para agilizar la acreditación te recomendamos \
          no enviar montos redondos: 10001.40 es mejor que 10000.0 <br/> - Tu \
          pago puede tardar hasta 72hs hábiles en acreditarse.<br/> <br/> \
          Mínimo: 3000 CLP. <br/> <br/> <strong> BITEX CHILE SPA <br/> \
          RUT: 76.720.941-K <br/> Banco Estado <br/> N° de cta cte CLP: \
          33470355676 <br/> </strong> <br/> Algunas consideraciones a la hora \
          de transferir:<br/> <span class='text-danger'>Solo podemos aceptar \
          transferencias provenientes del titular de la cuenta, no puedes hacer\
          que un tercero transfiera en tu cuenta de Bitex.la <br/>Los clientes \
          de Banco Estado deberán realizar la transferencia de la cuenta \
          \"Chequera electrónica\".</ span> <br/> Las transferencias son \
          procesadas de Lunes a Viernes. <br/> Una vez recibida por nuestro \
          banco o intermediario de pago puede tardar 24 horas hábiles en \
          acreditarse en tu balance. <br/> Todos los costos asociados corren a \
          tu cargo."
      }
    }
  ]
})
.onGet('https://bitex.la/api/accounts').replyOnce(200, getAccountTemplateData())
.onGet('https://bitex.la/api/accounts').replyOnce(200, 
  getAccountTemplateData("ars", 1000)
)
.onGet('https://bitex.la/api/orderbooks').reply(200, {
  "data": [{
    "id": "1",
    "type": "orderbooks",
    "attributes": {
      "code": "btc_usd",
      "base": {
        "code": "btc",
        "decimals": 8
      },
      "quote": {
        "code": "usd",
        "decimals": 2
      }
    }
  }, {
    "id": "5",
    "type": "orderbooks",
    "attributes": {
      "code": "btc_ars",
      "base": {
        "code": "btc",
        "decimals": 8
      },
      "quote": {
        "code": "ars",
        "decimals": 2
      }
    }
  }, {
    "id": "11",
    "type": "orderbooks",
    "attributes": {
      "code": "btc_clp",
      "base": {
        "code": "btc",
        "decimals": 8
      },
      "quote": {
        "code": "clp",
        "decimals": 2
      }
    }
  }]
})
.onPost('https://bitex.la/api/buying_bots').reply(200, {
  "data": {
    "id": "1",
    "type": "buying_bots",
    "attributes": {
      "amount": 100.0,
      "remaining_amount": 100.0,
      "chunk_size": 5.0,
      "eta": "2018-06-12T19:53:38.935Z",
      "executing": true,
      "to_cancel": false
    },
    "relationships": {
      "user": {
        "data": {
          "id": "8",
          "type": "users"
        }
      },
      "orderbook": {
        "data": {
          "id": "1",
          "type": "orderbooks"
        }
      }
    }
  }
})
.onGet('https://bitex.la/api/buying_bots/1').replyOnce(200, {
  "data": {
    "id": "1",
    "type": "buying_bots",
    "attributes": {
      "amount": 100.0,
      "remaining_amount": 50.0,
      "chunk_size": 50.0,
      "eta": "2018-06-12T19:53:38.935Z",
      "executing": true,
      "to_cancel": false
    },
    "relationships": {
      "user": {
        "data": {
          "id": "8",
          "type": "users"
        }
      },
      "orderbook": {
        "data": {
          "id": "1",
          "type": "orderbooks"
        }
      }
    }
  }
})
.onGet('https://bitex.la/api/buying_bots/1').replyOnce(200, {
  "data": {
    "id": "1",
    "type": "buying_bots",
    "attributes": {
      "amount": 100.0,
      "remaining_amount": 0,
      "chunk_size": 50.0,
      "eta": "2018-06-12T19:53:38.935Z",
      "executing": false,
      "to_cancel": false
    },
    "relationships": {
      "user": {
        "data": {
          "id": "8",
          "type": "users"
        }
      },
      "orderbook": {
        "data": {
          "id": "1",
          "type": "orderbooks"
        }
      }
    }
  }
})
.onGet('https://bitex.la/api/accounts').replyOnce(200,
  getAccountTemplateData("btc", 0.0012)
)
.onPost('https://bitex.la/api/selling_bots').reply(200, {
  "data": {
    "id": "1",
    "type": "selling_bots",
    "attributes": {
      "amount": 0.0012,
      "remaining_amount": 0.0012,
      "chunk_size": 0.0006,
      "eta": "2018-06-12T19:53:38.935Z",
      "executing": true,
      "to_cancel": false
    },
    "relationships": {
      "user": {
        "data": {
          "id": "8",
          "type": "users"
        }
      },
      "orderbook": {
        "data": {
          "id": "1",
          "type": "orderbooks"
        }
      }
    }
  }
})
.onGet('https://bitex.la/api/selling_bots/1').replyOnce(200, {
  "data": {
    "id": "1",
    "type": "selling_bots",
    "attributes": {
      "amount": 0.0012,
      "remaining_amount": 0.0006,
      "chunk_size": 0.0006,
      "eta": "2018-06-12T19:53:38.935Z",
      "executing": true,
      "to_cancel": false
    },
    "relationships": {
      "user": {
        "data": {
          "id": "8",
          "type": "users"
        }
      },
      "orderbook": {
        "data": {
          "id": "1",
          "type": "orderbooks"
        }
      }
    }
  }
})
.onGet('https://bitex.la/api/selling_bots/1').replyOnce(200, {
  "data": {
    "id": "1",
    "type": "selling_bots",
    "attributes": {
      "amount": 0.0012,
      "remaining_amount": 0,
      "chunk_size": 0.0006,
      "eta": "2018-06-12T19:53:38.935Z",
      "executing": false,
      "to_cancel": false
    },
    "relationships": {
      "user": {
        "data": {
          "id": "8",
          "type": "users"
        }
      },
      "orderbook": {
        "data": {
          "id": "1",
          "type": "orderbooks"
        }
      }
    }
  }
})
.onGet('https://bitex.la/api/accounts').replyOnce(200, 
  getAccountTemplateData("clp", 60000)
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
        "bank": "hsbc",
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
.onGet('https://bitex.la/api/cash_withdrawals/29').reply(200, {
  "data": {
    "id": "1",
    "type": "cash_withdrawals",
    "attributes": {
      "status": "done",
      "amount": 59832,
      "gross_amount": 60000,
      "cost": 0,
      "fee": 0,
      "net_amount": 12,
      "country": "OTHER",
      "payment_method": "domestic_bank",
      "currency": "CLP",
      "label": "Local Bank",
      "created_at": "2018-10-30T17:29:14.309Z"
    },
    "relationships": {
      "withdrawal_instruction": {
        "data": {
          "id": "1",
          "type": "withdrawal_instructions"
        }
      }
    }
  },
  "included": [
    {
      "id": "1",
      "type": "withdrawal_instructions",
      "attributes": {
        "label": "internacional",
        "schema": "bitex",
        "body": {
          "name": "John Doe",
          "city": "Buenos Aires",
          "phone": "12341234",
          "address": "calle falsa 123",
          "postal_code": "1234",
          "bank_account_number": "1234123412341234",
          "account_type": "savings",
          "bank": "lalala bank",
          "bank_swift": "1234123412341234",
          "bank_country": "CL",
          "bank_city": "santiago",
          "bank_address": "calle falsa 321",
          "bank_postal_code": "1234",
          "currency": "CLP",
          "payment_method": "domestic",
          "country": "OTHER"
        }
      }
    }
  ]
})
.onAny().passThrough()

let client = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false //Allow self-signed SSL certificate
  })
})

module.exports = client