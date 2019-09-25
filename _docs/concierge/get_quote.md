---
layout: doc
title: "Get a quote"
section: Concierge
index: 7
---

# Get a quote

Once you're done defining all the outputs, ask for a quote from Bitex.

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/concierge_requests/1010/request_quote" \
  --header "Authorization: your_api_key"

Response:
{ 
  "data": {
    "id": "1010",
    "type": "concierge_requests",
    "attributes": {
      "state": "quote_requested",
      "port_code": "ar_ars",
      "eta": "2000-01-01T00:20:00.000Z",
      "cancellable_until": "2000-01-01T00:35:00.000Z"
      "outputs_accepting": 0,
      "outputs_rejected": 0,
      "outputs_accepted": 1,
      "outputs_working": 0,
      "outputs_cancelled": 0,
      "outputs_settled": 0,
      "outputs_returned": 0,
      "outputs_total": 1,
    },
    "relationships": {
      // This is you, it's your Request.
      "user": { "data": { "id": "50505", "type": "users" } },
      // These will be your outputs. Just one in this case.
      "outputs": {
        "data": [ { "id": "32323", "type": "concierge_request_outputs" } ]
      }
    }
  }
}
{% endhighlight %}

If you are requesting a quote to our sandbox platform, please let us know by sending an email to [developers@bitex.la](mailto:developers@bitex.la). This step is not necessary for quotes to production.

In your mail you can request custom rates to enable testing for diferent scenarios. Just write to us and let us know.

Learn more about how to get a quote in the
[API Reference](https://developers.bitex.la/#9f8d8570-db6b-4f1f-8d0c-8cb440bf7f5c).

Asking for a quote will move your `Request` from the 
<span class="badge badge-dark">draft</span> state into
<span class="badge badge-primary">quote_requested</span>.

Your quote will not be produced right away, so you'll get a promise of having a quote
ready by a certain time and date, represented by the `eta` field.

The ETA could be just a few seconds or maybe hours away, 
depending on your destination ports and your service level agreement with Bitex.

Along with the `eta` you'll get a `cancellable_until` date, which would be at least
a few minutes after the `eta`. This will give you or your systems enough time to
cancel the `Request` if you disagree with the quote once it's available.

You can cancel your `Request` immediately if you think the ETA is too long, or
the `cancellable_until` window is too short.

Learn more about [Cancelling a Request](/docs/concierge/cancelling).

Now it's time to wait for your Quote to be ready.
