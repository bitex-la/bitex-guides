---
layout: doc
title: "Create RequestOutputs"
section: CrossBorder
index: 3
---

A `Request` has one or several `RequestOutputs`. A `RequestOutput`
indicates **who** gets paid, **where**, **how much**, and **how**.

The `user` relationship refers to the `User` **who** gets paid.
This is a `User` you manage, it can be someone that has been paid in the past,
or someone who's receiving their first payment and hasn't been reviewed by compliance yet.
Read more about [setting up new users](/docs/users/welcome/).

The `port` is **where** they are getting paid.
You can have multiple `RequestOutputs` with different `ports` in the same `Request`.
Read more in the [Ports section](/docs/cross_border/ports/).

The `amount` is **how much** they should receive in their bank account, expressed in the `port's` currency.
When you specify an `amount`, the `Request` will calculate how much money is required from the payer to
produce that much on destination.

Alternatively, you can provide a `budget` instead of an `amount`. When you specify a `budget`, the
`Request` will calculate how much money will be received by the payee in their bank account
when the payer only spends the given `budget`, expressed in payer currency.

The `withdrawal_instructions` express **how** to send money to their bank account, like their IBAN, SWIFT, or any other domestic bank instruction.
You can reuse `WithdrawalInstructions` you've created for this `User` or 
[create new ones](https://developers.bitex.la/?version=latest#60a3f2ed-62df-4dab-b2a1-b4c870503926).

Here's a `RequestOutput` for `User` #345 to be paid 1000 Chilean Pesos in Chile.

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
          "data": { "id": 345, "type": "users" }
        }
      }
    }
  }'
{% endhighlight %}

Learn more about creating, listing and showing `RequestsOutputs` in the
[CrossBorder API Reference](https://developers.bitex.la/?version=latest#23dc6577-b83d-4498-bd45-c4060ceaac95).

The example above creates a `RequestOutput` in the
<span class="badge badge-dark">accepting</span> state, which means
we'll run some preliminary checks, including a compliance review, and then move it to either
<span class="badge badge-primary">accepted</span> or
<span class="badge badge-danger">rejected</span> states.

Read the [Workflow Summary](/docs/cross_border/states_summary) for more info about
`RequestOutput` states.

You can add all the `RequestOutputs` you want while your `Request` is in the
<span class="badge badge-dark">draft</span> state.
When you're done adding them, you're ready for the next step.

