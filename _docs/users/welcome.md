---
layout: doc
featured_title: Manage your Users
title: Overview
description: "Manage multiple User accounts as a Master User."
topic: true
section: User Management
index: 1
---

You will need to create Bitex `User` accounts to use them as `Concierge` payees,
or if you're an asset manager that needs separate accounts for each customer.

In order to create them, you will need to request `Master User` permissions.

A Bitex `User` is a full fledged account: It has balances, can receive and issue `Concierge` remittances, use the `Exchange`, among other things.

You can act on their behalf calling any of the API endpoints available to regular `Users`.

As a full account, Bitex needs to make due dilligence on every `User`, and for
that purpose we will ask that you to complete some data required for our
__Know Your Customer__ procedures.

The data required from you will vary depending on the specific compliance
program agreed upon before granting you `Master User` role. If you're unsure about which data you should send, just contact us at
developers@bitex.la and we can go over it again with you.

Once you submit all the KYC data, our compliance team will review it and decide
on its approval. 

You can do some things with a `User` before it is approved,
like attempting to send them money with `Concierge`. We may defer those
actions until the account is approved by our compliance team.
