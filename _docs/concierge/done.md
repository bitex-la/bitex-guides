---
layout: doc
title: "Once it's done, it's done"
section: Concierge
index: 10
---

When all your `Outputs` reach a final state (
<span class="badge badge-warning">rejected</span>,
<span class="badge badge-success">settled</span> or 
<span class="badge badge-danger">returned</span>
) your `Request` will change from the
<span class="badge badge-primary">working</span> state into
<span class="badge badge-success">finished</span>.

Funds for <span class="badge badge-warning">rejected</span> `Outputs` will
have never moved from your balance, and funds
for <span class="badge badge-danger">returned</span> `Outputs` will be credited
to your Bitex balance minus costs for returning them.

You'll get a `Request` finalization [Callback](/docs/concierge/callbacks),
and you'll also be able to query your request forever like so:

{% highlight javascript %}
$ curl "https://sandbox.bitex.la/api/concierge_request/10101" \
  --header "Authorization: your_api_key"
{% endhighlight %}

Thank you for flying [Bitex.la](https://sandbox.bitex.la/)!
