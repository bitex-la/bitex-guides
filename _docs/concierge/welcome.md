---
layout: doc
title: Welcome to Concierge
featured_title: "Concierge <small><span class='badge badge-danger'>developer preview</span></small>"
featured: true
description: "Issue for remittances and mass disbursements."
section: Concierge
index: 1
---

The `Concierge API` let's you perform remittances and mass disbursements
from your Bitex balance to a number of supported countries.

You can request to pay multiple recipients in different countries and currencies
simultaneously.

In this guide you'll learn how to quote a set of concierge payouts in a single
`Request`, how to get updates and `RequestOutputs` that specify the payment
amounts and destinations, and how to receive progress updates.

Your `Request` and each individual payout go through a series of states
before reaching their final destination,
you'll also learn about all those states and what they mean.
