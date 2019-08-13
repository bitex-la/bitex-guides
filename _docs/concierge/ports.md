---
layout: doc
title: "The Port analogy"
section: Concierge
index: 3
---

You can think of the Concierge service as analog to sending shipments from one
`port` to several other `ports`. And that's exactly what we call them!

Each `port` is identified by the **country** and **currency** it represents,
you'll use them as either origin or destinations.

We use [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) and
[ISO 4217 currency codes](https://en.wikipedia.org/wiki/ISO_4217) when
defining ports. For example `ar_usd` is the port representing **United States Dollars** in **Argentina**.  Some other ports are `cl_clp`, `ar_ars`, `us_usd`, `mx_mxn`, `uy_uyu`, `py_pyg`, `py_usd`.

A list of all the supported `ports` is [available in the
API reference](https://developers.bitex.la/#42dfd01d-7b02-4b71-9db8-c90ffcbee1f8).

{% highlight javascript %}
  curl "https://sandbox.bitex.la/api/concierge_ports"
{% endhighlight %}

Ports don't change frequently, and we will let you know if we have to remove one
of the ports you're using.

<h4>Know your ports already?</h4>

**Great!** Now you're ready to [get an estimate](/docs/concierge/estimate) for your Concierge transaction.

Or alternatively, skip the estimate and [create a `Request`](/docs/concierge/request) right away.


<h4>Isn't an origin port just a Bitex balance currency?</h4>
All your Concierge `Requests` are funded from your Bitex balance, so you may
be wondering why you need to specify an origin `port` instead of just a `currency`.

While it's true Bitex treats all USD the same, it's possible that in the 
future USD may not be fungible across countries.

For example, USD available in Argentina, Urugay or Paraguay may not be the same as 
USD available in the United States or Europe.

If you're unsure about what to use as your origin `port`, just use the `port`
that matches your primary funding method.

