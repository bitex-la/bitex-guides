---
layout: doc
title: "Wait for your quote"
section: Concierge
index: 8
---

# Wait for your quote 

Your `Request` will have a maximum `eta` (Estimated Time of Arrival) for the quote.
Once it's available, your `Request` will move from the
<span class="badge badge-primary">quoted_requested</span> state, into
<span class="badge badge-primary">quoted</span> and
you will be notified with a [Callback](https://developers.bitex.la/?version=latest#fbe8a54d-6785-4e9f-bc4d-f6cfe9e10f6a).

You can also poll your `Request` to see its progress:

{% highlight javascript %}
$ curl "https://sandbox.bitex.la/api/concierge_requests/1010" \
  --header "Authorization: your_api_key"

Response:
{ 
  "data": {
    "id": "1010",
    "type": "concierge_requests",
    "attributes": {
      // Notice the state is 'quoted' and the amount is set.
      "state": "quoted",
      "amount": 10500.0,
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

At this point, you will have window of time up to `cancellable_until`
to [Cancel](/docs/concierge/cancelling) the `Request`, if you did not,
the quote will be considered accepted, and the request will change from
<span class="badge badge-primary">quoted</span> to
<span class="badge badge-primary">working</span>.

All `Outputs` in the
<span class="badge badge-primary">accepted</span>
state will eventually move to
<span class="badge badge-primary">working</span>.
