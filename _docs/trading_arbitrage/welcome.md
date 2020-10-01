---
layout: doc_full
title: "Exchange DMA"
description: "Plug in your trading robots to our exchange liquidity."
featured: true
position: 3
---

Bitex's Exchange offers **direct market access** to all our orderbooks, including `BTC/USD`, `BTC/ARS`,
`BTC/CLP`, `BTC/UYU`, `BTC/PYG` and `BCH/USD`.

Regardless of your trading strategy you'll usually need to:

- See all recent trades and volatility using the [Transactions](https://developers.bitex.la/?version=latest#7a99785e-bcd8-4bdf-a7d8-0dee85d6f3a5) endpoint.
- Size the market depth in both bids and asks using the 
[Market](https://developers.bitex.la/?version=latest#96ab45ce-7615-4d12-8262-8fb72ca50755) endpoint.
- Check your own balances available for trading in the [Account](https://developers.bitex.la/?version=latest#2aede449-e351-4410-8c89-da76c053474c) endpoint.
- Place [Bids](https://developers.bitex.la/?version=latest#6d5f5991-ba42-448f-9583-3b4d48e18350) and [Asks](https://developers.bitex.la/?version=latest#892ed025-47b7-4216-a2c4-7407aa7c150e) in Bitex, as well as following their execution status in your [Active Order List](https://developers.bitex.la/?version=latest#81d0cc59-58fa-445d-9a92-e6476bf15837).
- Check your recent [Trades](https://developers.bitex.la/?version=latest#e69cec1b-6b33-4545-85aa-bcce0d8a27ec) to see what got bought and/or sold.

We have an open source robot that can be used as an example of our API usage, and can also be used to do arbitrage between Bitex and other exchanges. [Fork it on Github](https://github.com/bitex-la/bitex-bot).
