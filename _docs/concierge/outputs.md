---
layout: doc
title: "Create Outputs"
section: Concierge
index: 6
---

A Concierge `Request` may have one or several `Outputs`. An `Output`
indicates **who** gets paid, **where**, **how much**, and **how**.


The `user` field refers to the `User` **who** gets paid, this can be someone you have
already paid, or someone new you've never paid before. 
Read more about [setting up new users](https://developers.bitex.la/#86c5d36b-3f74-499f-817e-38f9a3d789ce).

The `port` is **where** they are getting paid.
You can have multiple `ports` in the same `Request`.

The `amount` is **how much** they should receive, expressed in the `port's` currency.

The `withdrawal_instructions` express **how** to send money to their bank account, like their IBAN, SWIFT, or any other domestic bank instruction.
You can reuse `WithdrawalInstructions` you've created for this `User` or 
[create new ones](https://developers.bitex.la#6f243946-38a1-4906-9fe3-8d5fa8546dd5).

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/concierge_request_outputs" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --data "{
    "data": {
      "type": "concierge_request_outputs",
      "attributes": {
        "port_code": "cl_clp",
        "amount": 1000
      },
      "relationships": {
        "request": {
          "data": { "id": 1010, "type": "concierge_requests" }
        },
        "withdrawal_instruction": {
          "data": { "id": 2121, "type": "withdrawal_instructions" }
        },
        "user": {
          "data": { "id": 20202, "type": "users" }
        }
      }
    }
  }'

Response:
{
  "data": {
    "id": "32323", // This is your output's unique id.
    "type": "concierge_request_outputs",
    "attributes": {
      "amount": 1000,
      "port_code": "cl_clp",
      "state": "accepting"
    },
    "relationships": {
      // This is your request, currentnly in draft mode.
      "request": {
        "data": { "id": "1010", "type": "concierge_requests" }
      },
      // This is the payee.
      "user": {
        "data": { "id": "20202", "type": "users" }
      },
      // These are bank account details where the payee is receiving the money.
      "withdrawal_instruction": {
        "data": { "id": "2121", "type": "withdrawal_instructions" }
      }
    }
  },
  // The response includes full details about the user and the
  // withdrawal instructions used, for your convenience.
  "included": [
    {
      "id": "20202",
      "type": "users",
      "attributes": {
        "name": "person3@example.com",
        "email": "person3@example.com",
        "kyc_accepted": true,
        "otp_enabled": true,
        "do_not_email": false,
        "trezor_login_enabled": false
      }
    },
    {
      "id": "2121",
      "type": "withdrawal_instructions",
      "attributes": {
        "label": null,
        "schema": "bitex",
        "body": {
          "payment_method": "international_bank",
          "country": "US",
          "account_type": "checking",
          "name": "bob",
          "city": "buenos aires",
          "bank": "standard chartered",
          "currency": "USD"
        }
      }
    }
  ]
}

{% endhighlight %}

Learn more about creating, listing and showing `Concierge Requests Outputs` in the
[API Reference](https://developers.bitex.la/#d70e6467-f6b2-41d9-8391-9b9865806442).

The example above creates an `Output` in the
<span class="badge badge-dark">accepting</span> state, which means
we'll run some preliminary checks and move it to either
<span class="badge badge-primary">accepted</span> or
<span class="badge badge-danger">rejected</span> states.

Read the [Workflow Summary](/docs/concierge/states_summary) for more info about
`Output` states.

You can create as many `Outputs` as you like, when you're done adding
them, you're ready for the next step.

