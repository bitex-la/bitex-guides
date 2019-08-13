---
layout: doc
title: "Need an estimate?"
section: Concierge
index: 4
---

You can get a quick estimate for your Remittance or Mass disbursement
before you get an actual quote.

A `ConciergeEstimate` has a reference `amount` we would ask from you at the origin `port` in order to produce the requested amounts at a single destination `port`.

For your convenience, the `amount` includes the cash-in costs and fees. This differs
from an actual `Request` quote, as you'll see next.

The estimate can be calculated from the origin `port` and the total amount to be delivered at a destination `port`.

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/remittance_quotes" \
  --header "Content-Type: application/json" \
  --data '{
    "data": {
      "type": "concierge_estimates",
      "attributes": {
        "from_code": "ar_ars",
        "to_code": "cl_clp",
        "amount": 1000
      }
    }
  }'

Response:

{ "data": {
    "id": "1565669153", // Don't mind the id, estimates are not persisted.
    "type": "concierge_estimates",
    "attributes": {
      "from_code": "ar_ars",
      "to_code": "cl_clp",
      "amount": 1000.0,
      "result": 9447.21,
      "origin_taken": 10.97, // Fees and costs debited at origin.
      "destination_taken": 47.47 // Fees and costs debited at destination.
    }
  }
}
{% endhighlight %}

<h4>What's the difference between estimate and quote?</h4>

An estimate is just for reference, while a quote is an `amount` we're bound to honor.

You can only get an estimate for a single destination at a time, but `Requests`
are quoted for multiple destinations.

For a quote you need to create a full Concierge `Request`, with all the payees
and amounts properly defined. You can get an estimate just with the ports involved
and the destination amount.

Last, but not least, a `Request` quote is funded from your Bitex balance,
thus a quote does not consider cash-in costs, as they've already been paid.


