---
layout: doc
title: "Create a Request"
section: CrossBorder
index: 2
---

A **CrossBorder** `Request` represents the intent of sending money from
one `User` to other `Users` in different countries and currencies.

All the sending and receiving `Users` should be managed by you as their **Master** `User`,
and they all must have undergone a Bitex **Compliance Review**.
Learn more in the [User management section](/docs/users/welcome/).

**Notice:** The data required for `Users`
will depend on whether they're issuing or receiving the payments,
 their country, the amounts transacted, and your integration use case..
Make sure to know which data we require for your `Users` before starting your integration,
[our sales team](mailto:comercial@bitex.la) can help with that.

### Drafting a Request

The `Request` indicates **who** is paying and from **where**.

Say you want `User` #112 to pay from their Argentine Peso balance in Argentina
to recipients in Chile and Mexico (receiving chilean and mexican pesos respectively).

You should first start by drafting a `Request`, specifying their user ID and 
using `ar_ars` as the `port_code`.

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/concierge_requests" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --data '{
    "data": {
      "type": "concierge_requests",
      "attributes": {
        "port_code": "ar_ars"
      },
      "relationships": {
        "user": { "data": { "id": "112", "type": "users" } }
      }
    }
  }'
{% endhighlight %}

The example above is taken from the
[CrossBorder API Reference](https://developers.bitex.la/?version=latest#23dc6577-b83d-4498-bd45-c4060ceaac95)

This creates a request in the
<span class="badge badge-dark">draft</span> state.

Now that you know your `Request`'s unique `id`, you can define the recipients
and the amounts they should receive by creating `RequestOutputs`.

As you may have noticed, a `Port` represents a **country** and **currency**.
In this case, the sender's country and currency. Learn more in the [Ports section](/docs/cross_border/ports/).

