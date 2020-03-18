---
layout: doc_full
title: "Market Data and Ticker"
description: "Public access to our exchange prices, volume and orderbooks."
featured: true
position: 1
---

Bitex's [market data](https://developers.bitex.la/?version=latest#669ba3d8-5706-41b5-9d9c-de3a24d14e01)
is public and free to use. It has the last prices, the current bids and asks, and full transaction history.

It's used by applications like Clarin.com's [crypto assets section](https://www.clarin.com/economia/divisas-acciones-bonos#criptomonedas).

You can query the API yourself, or we can help you building and hosting a widgets to embed on your website.

You don't need an API key to fetch the market data, but keep in mind **it is provided as-is**, and not
fit for a particular purpose. If you want to use our market data as reference for any kind of contractual obligation, please let
us know and **we can license it to you and provide a Service Level Agreement**.

Here's an example showing all tickers. See the other endpoints in the [market section](https://developers.bitex.la/?version=latest#669ba3d8-5706-41b5-9d9c-de3a24d14e01) of the API reference.

{% highlight javascript %}
$ curl -X GET "https://bitex.la/api/tickers"

Response:

{
   "data" : [
      {
         "type" : "tickers",
         "id" : "btc_usd",
         "attributes" : {
            "ask" : 5315.12855427,
            "last" : 5332.21706047,
            "bid" : 5255.056356,
            "open" : 5260.62726288,
            "low" : 5123.44,
            "vwap" : 5214.67182309013,
            "high" : 5500,
            "price_before_last" : 5500,
            "volume" : 3.18099375
         }
      },
      {
         "id" : "btc_ars",
         "type" : "tickers",
         "attributes" : {
            "volume" : 3.17802776,
            "price_before_last" : 481000.01,
            "high" : 526000,
            "low" : 462100,
            "vwap" : 503226.947738448,
            "open" : 522999.99,
            "last" : 481000.01,
            "ask" : 512240.27282739,
            "bid" : 493000
         }
      }
      ...snip...
   ]
}

{% endhighlight %}


