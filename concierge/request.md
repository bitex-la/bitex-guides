# Create a Concierge Request

A `Concierge Request` represents your intent of sending money from your account
to multiple recipients in different countries and countries.

### Choosing your Ports
We make this analog to sending shipments from one port to several other ports.
Each port is identified by the country and currency to be used, for example `ar_ars`.

A list of all the ports we can serve is [available in the
API](https://developers.bitex.la/#42dfd01d-7b02-4b71-9db8-c90ffcbee1f8).

```
curl "https://sandbox.bitex.la/api/concierge_ports"
```

Ports don't change frequently, we will let you know if we have to remove one
of the ports you're using.

### Where are you sending from?

Then, to instruct that you want to pay starting with Argentine pesos from Argentina
using the `ar_ars` port you would create a `Concierge Request`:

```
curl -X POST "https://sandbox.bitex.la/api/concierge_requests" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --data '{
    "data": {
      "type": "concierge_requests",
      "attributes": {
        "port_code": "ar_ars"
      }
    }
  }'
```

Learn more about creating, listing and showing `Concierge Requests` in the
[API Reference](https://developers.bitex.la/#a65c3a0d-f2d6-4d95-b7cd-f991c5f3480b).

### Where are you sending to?

For each recipient you will have to tell us `who` gets paid,
`where`, `how much`, and `how`.

You do this by creating `Outputs`, and setting:

- **User:** `Who` gets paid, this can be a user you have already paid to, or someone
new you've never paid before.
Read more about [setting up a new recipient](/concierge/create_user).

- **Port:** `Where` are they getting paid. You can mix destination `Ports` in the same 
`Concierge Request`.

- **Amount:** `How much` should they receive, expressed in the `Port`'s currency.

- **Withdrawal Instructions:** Instructions regarding `how` to send money to their
bank account, like their IBAN, SWIFT, or any other domestic bank instruction.
You can reuse `Withdrawal Instructions` you've created for this `User` or 
create `new ones`. Learn more in the
[Withdrawal Instructions API reference](https://developers.bitex.la#6f243946-38a1-4906-9fe3-8d5fa8546dd5).


```
curl --location --request POST "https://bitex.la/api/concierge_request_outputs" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.0" \
  --header "One-Time-Password: valid_otp" \
  --data "{
    \"data\": {
        \"type\": \"concierge_request_outputs\",
        \"attributes\": {
            \"port_code\": \"ar_ars\",
            \"amount\": 1000
        },
        \"relationships\": {
            \"withdrawal_instruction\": {
                \"data\": {
                    \"id\": 1,
                    \"type\": \"withdrawal_instructions\"
                }
            },
            \"user\": {
                \"data\": {
                    \"id\": 5,
                    \"type\": \"users\"
                }
            }
        }
    }
}"
```

<div class="footer-nav">
  <span>
    Back:
    <a href="/concierge/pre_requisites/">Pre-Requisites</a>
  </span>
  <span class="forth">
      Next: <a href="/concierge/request_quote">Get a quote</a>
  </span>
</div>


Then you need to create the money tagets, we called them _Outputs_. To create an output you have to do it this way:


You have to create at least one output.

<!-- [Requirements](/concierge/requirements)     [Request Quote](/concierge/request_quote)
<div style="text-align: right"> <a href="/concierge/request_quote">Request Quote</a> </div> -->



----------------------------------------------------------------

  - Tenés que elegir los ports.
  - Tenés que indicar a quines y cuanto. (link a la otra sección: que pasa si no están creadas las personas? como se crean? Link a
    otra guia)



Response de listado de Ports
```
"data": [
    {
        "id": "1",
        "type": "concierge_ports",
        "attributes": {
            "code": "ar_ars",
            "country": "ar",
            "currency_code": "ars"
        }
    },
    {
        "id": "2",
        "type": "concierge_ports",
        "attributes": {
            "code": "ar_ars",
            "country": "ar",
            "currency_code": "usd"
        }
    },
    {
        "id": "3",
        "type": "concierge_ports",
        "attributes": {
            "code": "cl_clp",
            "country": "cl",
            "currency_code": "clp"
        }
    },
    {
        "id": "4",
        "type": "concierge_ports",
        "attributes": {
            "code": "uy_uyu",
            "country": "uy",
            "currency_code": "uyu"
        }
    },
    {
        "id": "5",
        "type": "concierge_ports",
        "attributes": {
            "code": "py_pyg",
            "country": "py",
            "currency_code": "pyg"
        }
    },
    {
        "id": "6",
        "type": "concierge_ports",
        "attributes": {
            "code": "uy_usd",
            "country": "uy",
            "currency_code": "usd"
        }
    },
    {
        "id": "7",
        "type": "concierge_ports",
        "attributes": {
            "code": "py_usd",
            "country": "py",
            "currency_code": "usd"
        }
    },
    {
        "id": "8",
        "type": "concierge_ports",
        "attributes": {
            "code": "us_usd",
            "country": "us",
            "currency_code": "usd"
        }
    },
    {
        "id": "9",
        "type": "concierge_ports",
        "attributes": {
            "code": "other_usd",
            "country": "other",
            "currency_code": "usd"
        }
    },
    {
        "id": "10",
        "type": "concierge_ports",
        "attributes": {
            "code": "mx_mxn",
            "country": "mx",
            "currency_code": "mxn"
        }
    },
    {
        "id": "11",
        "type": "concierge_ports",
        "attributes": {
            "code": "other_eur",
            "country": "other",
            "currency_code": "eur"
        }
    }
]
```






Response de creacion de Requests
```
{
  "data": {
    "id": "6",
    "type": "concierge_requests",
    "attributes": {
      "port_code": "ar_ars",
      "outputs_accepting": 0,
      "outputs_rejected": 0,
      "outputs_accepted": 0,
      "outputs_working": 0,
      "outputs_cancelled": 0,
      "outputs_settled": 0,
      "outputs_returned": 0,
      "outputs_total": 0
    },
    "relationships": {
      "user": {
        "data": {
          "id": "5",
          "type": "users"
        }
      },
      "outputs": {
        "data": []
      }
    }
  }
}
```
