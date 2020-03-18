---
layout: doc
featured_title: Manage your Users
title: Overview
description: "Manage multiple User accounts as a Master User."
topic: true
section: User Management
index: 1
---

Bitex lets **Master** `Users` manage multiple `User` accounts.

Learn more about **Master** `User` access in the [authentication section](/docs/authentication/)

A Bitex `User` is a full fledged `Account`: It has balances, can participate in [CrossBorder remittances](/docs/cross_border/welcome/),
use the `Exchange`, and procces [Payments](/docs/payments/), among other things.

As a full `Account`, Bitex needs to make due dilligence on every `User`, and for
that purpose we will ask that you to complete some data required for our
**Know Your Customer** procedures.

The data required from you will vary depending on the specific compliance
program agreed upon before granting you **Master** `User` permissions.
If you're unsure about which data you should send, just contact us at
[our sales team](mailto:comercial@bitex.la).

Once you submit all the KYC data, our compliance team will review it and decide
on the `User`'s approval. 

You can do some things with a `User` before it is approved,
like attempting to send them money with [CrossBorder remittances](/docs/cross_border/welcome/).
We may defer those actions until the account is approved by our compliance team.

To create a user just post their credentials to the users endpoint like so

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1" \
  --data '{ "data":{"type": "users"}}'
{% endhighlight %}

You can check the `User`'s `compliance_state` attribute to see their current status
regarding compliance checks. Head to the [user states summary section](/docs/users/states_summary)
for all details about the `User`'s lifecycle.

Learn more about creating, listing and showing your `User`'s data in the
[Users API reference](https://developers.bitex.la/?version=latest#e463005d-0320-4e33-9d0b-4112e73fa3c2)
