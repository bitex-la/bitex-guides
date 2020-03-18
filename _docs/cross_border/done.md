---
layout: doc
title: "Once it's done, it's done"
section: CrossBorder
index: 6
---

When all your `RequestOutputs` reach a final state (
<span class="badge badge-warning">rejected</span>,
<span class="badge badge-success">settled</span> or 
<span class="badge badge-danger">returned</span>
) your `Request` will change from the
<span class="badge badge-primary">working</span> state into
<span class="badge badge-success">finished</span>.

You'll get a `Request` finalization [Callback](https://developers.bitex.la/?version=latest#fbe8a54d-6785-4e9f-bc4d-f6cfe9e10f6a),
and you'll also be able to query your request forever like so:

{% highlight javascript %}
$ curl "https://sandbox.bitex.la/api/concierge_request/10101" \
  --header "Authorization: your_api_key"
{% endhighlight %}
