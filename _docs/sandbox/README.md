---
layout: doc_full
title: "Sandbox"
description: "We have a fully featured Sandbox environment."
topic: true
---
We have a **sandbox** environment at [https://sandbox.bitex.la](https://sandbox.bitex.la)
where you can start your API integration before moving to **production**.

These two environments behave similarly, but they share no data.

If you need to access endpoints that require authentication, you'll have to
sign up and keep separate `ApiKeys` for each one of them.
Learn more in the [Authentication Guide](/docs/authentication/README).

The **sandbox** uses the BTC and BCH testnets, so you can deposit testnet coins from a
[Bitcoin Testnet Faucet](https://coinfaucet.eu/en/btc-testnet/) or a 
[Bitcoin Cash Testnet Faucet](https://developer.bitcoin.com/faucets/bch/).

You can even do some trading in the **sandbox** exchange, just don't expect the prices to match real market prices.

When moving to **production** you'll only have to change the URL to **https://bitex.la** and
the `ApiKey` you're using.

Also, **sandbox** does not have an operations and compliance team behind it, 
you'll need to contact the **developer team** at [developers@bitex.la](mailto:developers@bitex.la)
for any **sandbox** administrative task, such as:
- Requesting for a `User` `Account` to be approved (or rejected) by compliance.
- Resetting a 2FA.
- Crediting fiat deposits.
- Processing fiat or crypto withdrawals.
- Following through with a Crossborder payment.

