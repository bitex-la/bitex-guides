---
layout: doc
title: "Cancelling a Request"
description: "Cancelling a Request"
section: Concierge
index: 12
---

# Cancelling a Request

A `Request` can be cancelled when in the <span class="badge badge-dark">draft</span>
state or anytime before the `cancellable_until` date and time.

You may cancel it because of a drafting error, because you think the `eta` is too
long or because the `cancellable_until` is too short afterwards.

You may also cancel because you don't like the quote.

Cancelling a `Request` is not a negotiation method, it's more of a way for you to
protect from errors in our Service Level Agreement. You shouldn't find yourself
cancelling `Requests` very often.

Having 10101 as your `Request` `id`, you can cancel it like this:

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/concierge_requests/10101/cancel" \
  --header "Authorization: your_api_key"
{% endhighlight %}

Learn more about how to cancel a `Request` in the
[API Reference](https://developers.bitex.la/#6b27b5ea-7770-4779-93fd-6c74874f004a).
