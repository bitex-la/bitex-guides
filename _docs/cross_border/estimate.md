---
layout: doc
title: "Appendix B: Estimates"
section: CrossBorder
index: 9
---

An `Estimate` tries to be a simpler way to get a reference quote without
having to set up a full `Request` with all the `Users` and `RequestOutputs`.

For an `Estimate` you just need to provide the origin and destination
`Ports` and either the `amount` or `budget` to be paid on each one.
You can configure múltiple ports.

Estimates are always available in real time, unlike `Requests` that are
quoted asynchronously. The main difference is that an `Estimate` is not
contractual. **Bitex does not commit to honor `Estimate` prices.**

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/concierge_estimates" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --data '{
    "data": {
      "type": "concierge_estimates",
      "attributes": {
        "port_code": "cl_clp",
        "outputs": [
          {
            "port_code": "us_usd",
            "budget": 100000
          },
          {
            "port_code": "mx_mxn",
            "amount": 500
          }
        ]
      }
    }
  }'

Response:
{
  "data": {
    "id": "1569501395",
    "type": "concierge_estimates",
    "attributes": {
      "hint_token": "323576820efe57609830c5dd0d4ecf6b707799d1dc0736042ddc00ca659d1927",
      "port_code": "cl_clp",
      "total_to_spend": 119132.65420936,
      "outputs": [
        {
          "port_code": "us_usd",
          "budget": 100000,
          "amount": 133.96820027,
          "rate": 0.00135317,
          "all_in_rate": 0.00133968,
          "fee_and_cost": 997.5
        },
        {
          "port_code": "mx_mxn",
          "budget": 19132.65420936,
          "amount": 500,
          "rate": 0.02647582,
          "all_in_rate": 0.02613333,
          "fee_and_cost": 247.50367733
        }
      ]
    }
  }
}

{% endhighlight %}

`Estimates` are not persisted, so their ID is meaningless, but they're issued
with a `hint_token`. If you ask to quote a `Request` within 10 minutes of 
getting an estimate for the same amounts and ports, you can provide the `Estimate`'s `hint_token`
to the `request_quote` endpoint and we'll maintain the same pricing.

See the [API Reference](https://developers.bitex.la/?version=latest#a180cbc6-95a7-44ae-bd27-0fa3c07484fe)
for more information about estimates.
