---
layout: doc
title: "Create a Concierge Request"
section: Concierge
index: 5
---
A Concierge `Request` represents your intent of sending money from your account
to multiple recipients in different countries and currencies.

<h4>Drafting a Request</h4>

Say you want to pay out from your Argentine Peso balance in Argentina
to recipients in Chile and Mexico (receiving chilean and mexican pesos respectively).

You should first start by drafting a concierge `Request`, using `ar_ars` as the
`port_code`.

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/concierge_requests" \
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

Response:
{
  "data": {
    "id": "6", // This is your request's unique identifier.
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
      // This is you, it's your Request.
      "user": { "data": { "id": "5", "type": "users" } },
      // No outputs specified yet, we'll get there next.
      "outputs": { "data": [] }
    }
  }
}

{% endhighlight %}

As you see, this creates a request in the
<span class="badge badge-dark">draft</span> state.

Learn more about creating, listing and showing Concierge `Requests` in the
[API Reference](https://developers.bitex.la/#a65c3a0d-f2d6-4d95-b7cd-f991c5f3480b).

Now that you know your `Request` unique `id`, you can define the recipients
by creating `Outputs`.

### Where are you sending to?

For each recipient you will have to tell us `who` gets paid,
`where`, `how much`, and `how`.

You do this by creating `Outputs`, and setting:

- **User:** `Who` gets paid, this can be a user you have already paid to, or someone
new you've never paid before.
Read more about [setting up a new recipient](/docs/concierge/create_user).

- **Port:** `Where` are they getting paid. You can mix destination `Ports` in the same 
`Concierge Request`.

- **Amount:** `How much` should they receive, expressed in the `Port`'s currency.

- **Withdrawal Instructions:** Instructions regarding `how` to send money to their
bank account, like their IBAN, SWIFT, or any other domestic bank instruction.
You can reuse `Withdrawal Instructions` you've created for this `User` or 
create `new ones`. Learn more in the
[Withdrawal Instructions API reference](https://developers.bitex.la#6f243946-38a1-4906-9fe3-8d5fa8546dd5).

```
curl -X POST "https://sandbox.bitex.la/api/concierge_request_outputs" \
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
            \"request\": {
                \"data\": {
                    \"id\": 1,
                    \"type\": \"concierge_requests\"
                }
            },
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

  - `accepting`: Waiting for our acceptance checks.
  - `accepted`:  All the checks are OK.
  - **`rejected`**:  Our acceptance checks didn't pass.
  - `working`:   We are trying to send the money to the target port.
  - **`cancelled`**: This payment was cancelled while working on it.
  - **`settled`**:   The payment was settled.
  - **`returned`**:  Some external agent could not process the payment.

Learn more about creating, listing and showing `Concierge Requests Outputs` in the
[API Reference](https://developers.bitex.la/#d70e6467-f6b2-41d9-8391-9b9865806442).


********* TODO
********* acceptance checks

<div class="footer-nav">
  <span>
    Back:
    <a href="/concierge/pre_requisites/">Pre-Requisites</a>
  </span>
  <span class="forth">
      Next: <a href="/concierge/get_quote">Get a quote</a>
  </span>
</div>

