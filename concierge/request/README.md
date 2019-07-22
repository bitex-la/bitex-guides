# Create a Concierge request

A Concierge Request is the way for sending money from one port to other ports.
So the first step to create a Request is select the source port code.
To know about the available ports you could use the ports endpoint:

```
curl --location --request GET "https://sandbox.bitex.la/api/concierge_ports" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1"

```

The above will return several possible port codes, like, for example: `ar_usd`. You will need this code to create a Request, in the following way:

```
curl --location --request POST "https://sandbox.bitex.la/api/concierge_requests" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1" \
  --header "One-Time-Password: valid_otp" \
  --data "{
	\"data\": {
		\"type\": \"concierge_requests\",
	
		\"attributes\": {
			\"port_code\": \"ar_usd\"
		}
	}
}"
```

?????
```
{
  "data": {
    "id": "6",
    "type": "concierge_requests",
    "attributes": {
      "port_code": "ar_usd",
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

Then you need to create the money tagets, we called them _outputs_. To create an output you have to do it this way:

```
{
    "data": {
        "type": "concierge_request_outputs",
        "attributes": {
            "port_code": "ar_usd",
            "amount": 1000
        },
        "relationships": {
            "request": {
                "data": {
                    "id": "5",
                    "type": "concierge_requests"
                }
            },
            "withdrawal_instruction": {
                "data": {
                    "id": 1,
                    "type": "withdrawal_instructions"
                }
            },
            "user": {
                "data": {
                    "id": 6,
                    "type": "users"
                }
            }
        }
    }
}
```
You have to create at least one output.

<br/>
<hr/>
<p style="text-align:left;">
    <a href="/concierge/requirements">Requirements</a>
    <span style="float:right;">
        <a href="/concierge/request_quote">Request Quote</a>
    </span>
</p>

<!-- [Requirements](/concierge/requirements)     [Request Quote](/concierge/request_quote)
<div style="text-align: right"> <a href="/concierge/request_quote">Request Quote</a> </div> -->


  - Tenés que elegir los ports.
  - Tenés que indicar a quines y cuanto. (link a la otra sección: que pasa si no están creadas las personas? como se crean? Link a
    otra guia)

????
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
            "code": "ar_usd",
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
