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
curl -X POST "https://bitex.la/api/concierge_request_outputs" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --data "{
    \"data\": {
        \"type\": \"concierge_request_outputs\",
        \"attributes\": {
            \"port_code\": \"cl_clp\",
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

Each of the created `Outputs` has its own `state` which can be:

  - `accepting`: Waiting for our Compliance department resolution.
  - `accepted`:  All validations completed.
  - `rejected`:  Our Compliance validations did not pass.
  - `working`:   We are trying to send the money to the target port.
  - `cancelled`: This payment was cancelled while working on it.
  - `settled`:   The payment was settled.
  - `returned`:  Some external agent could not process the payment.

Learn more about creating, listing and showing `Concierge Requests Outputs` in the
[API Reference](https://developers.bitex.la/#d70e6467-f6b2-41d9-8391-9b9865806442).

<div class="footer-nav">
  <span>
    Back:
    <a href="/concierge/pre_requisites/">Pre-Requisites</a>
  </span>
  <span class="forth">
      Next: <a href="/concierge/get_quote">Get a quote</a>
  </span>
</div>

