---
layout: doc
title: "Attestation Report Data"
section: Audit Bitex
index: 2
---

A Bitex `Attestation` report includes **records, one per line**, representing
relevant actions or information since the previous `Attestation`.

Each line has a `type` that represents the type of action, a unique `id` for
that specific action of that `type`, and extra details
about that specific action or information.


#### Fiat Inflow
These represent an amount of **fiat currency** flowing into Bitex's control.
For example, when a customer sends funds from their bank account to Bitex.

These records will contain the `fiat_code` which is the ISO 3 letter fiat currency code,
 and the `gross_amount` which is how much was sent by the customer before cash-in fees were
deducted.

{% highlight javascript %}
{"type":"cash_deposit","id":1,"fiat_code":"usd","gross_amount":1000.0}
{% endhighlight %}


#### Fiat Outflow

These represent an amount of **fiat currency** flowing out of Bitex's control.
For example, when a customer sends funds from their Bitex balance to their
bank account or similar service.

These records will contain the `fiat_code` which is the ISO 3 letter fiat currency code,
and the `gross_amount` which is the amount that was deducted from the customer balance
including cash-out fees.

{% highlight javascript %}
{"type":"cash_withdrawal","id":1,"fiat_code":"ars","gross_amount":50.0}
{% endhighlight %}


#### Crypto Asset Inflow

These represent crypto assets flowing into Bitex's control.
For example, when a customer sends Bitcoin or Bitcoin Cash to their Bitex issued
addresses.

These records will contain the `coin_code` whis is btc or bch depending on the
asset received, and also the `amount` received by Bitex.

{% highlight javascript %}
{"type":"coin_deposit","id":1,"coin_code":"btc","amount":10.0}
{% endhighlight %}


#### Crypto Asset Outflow

These represent crypto assets going out of Bitex's control.
For example, when a customer withdraws Bitcoin to their own cryptocurrency wallet or another exchange.

These records will contain the `coin_code` whis is btc or bch depending on the
asset sent, and also the `amount` sent by Bitex.

{% highlight javascript %}
{"type":"coin_withdrawal","id":1,"coin_code":"btc","amount":10.0}
{% endhighlight %}


#### Trades

These represent single trades that occur in our markets, also known as **matches**.
For example, when a customer buys Bitcoin from another customer in the live exchange.

These records will contain an `orderbook_code` with the pair being traded. `price` is
the price that was matched, `seller_given` is the quantity of crypto asset sold, and
`buyer_given` is the full fiat amount paid. Both amounts are before Bitex's trading fees
are deducted.

{% highlight javascript %}
{"type":"match","id":1,"orderbook_code":"btc_usd","seller_given":1.0,"buyer_given":20.0,"price":20.0}
{% endhighlight %}

#### Transfers

These represent fund transfers of fiat currency or crypto assets between Bitex customers within
Bitex's network and knowledge. For example, when someone sends money using our CrossBorder service.

These records will include a `currency_code` which is a 3 letter currency or crypto asset code,
the amount sent by the payer, and the amount received by the other payee.

{% highlight javascript %}
{"type":"transfer","id":1,"currency_code":"usd","sent":10.0,"received":8.0}
{% endhighlight %}

#### Crypto Asset Addresses

Bitex manages multiple Bitcoin and Bitcoin Cash addresses on behalf of its customers.
All `bcash_address` and `bitcoin_address` records represent an address known to us.

These records include the `public_address` you can use to look them up in their
specific blockchain.

{% highlight javascript %}
{"type":"bitcoin_address","id":1,"public_address":"1Cf2Szp9x47RShpSRjdVmVkUbWmz1w7GCE"}
{"type":"bcash_address","id":1,"public_address":"bitcoincash:qqt0vafxt25gy20qwe929yqdvpwyjm67nc0jrldqdv"}"
{% endhighlight %}
