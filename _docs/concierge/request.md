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
    "id": "1010", // This is your request's unique identifier.
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
      "user": { "data": { "id": "50505", "type": "users" } },
      // No outputs specified yet, we'll get there next.
      "outputs": { "data": [] }
    }
  }
}

{% endhighlight %}

Learn more about creating, listing and showing Concierge `Requests` in the
[API Reference](https://developers.bitex.la/#a65c3a0d-f2d6-4d95-b7cd-f991c5f3480b).

As you see, this creates a request in the
<span class="badge badge-dark">draft</span> state.

Now that you know your `Request` unique `id`, you can define the recipients
and the amounts they should receive by creating `Outputs`.
