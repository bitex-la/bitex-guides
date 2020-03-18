---
layout: doc_full
title: "Asset Management"
description: "For investment funds or wealth managers buying Bitcoin."
featured: true
position: 4
---

Bitex has two ways to help __asset managers__ expose their customers to
Bitcoin trading.

Whatever kind of integration you choose, we would expect you to first start
in our [sandbox API environment](/docs/sandbox/README) and then move to
**production** once everything is ready.

#### A regular Bitex account for the Asset Manager.

In this scenario, you will open a single Bitex account for your firm,
fund it, and start trading with it.

Your account may be subject to enhanced due dilligence for compliance reasons,
and you will only be able to deposit and withdraw fiat currencies from
your firm's bank accounts.

Start by [getting your User API access](/docs/authentication/user).

Then read the [public market
data](https://developers.bitex.la/?version=latest#d7e259a6-b126-4d4c-ae66-b456242d33a6) endpoints
to see what's going on in the markets.

Then use your API key to [place orders, cancel them, and see your
trades](https://developers.bitex.la/?version=latest#6d5f5991-ba42-448f-9583-3b4d48e18350)

Look at the
[deposit](https://developers.bitex.la/?version=latest#e6d2a366-043b-4173-9b80-ed68f62341b7)
and [withdraw](https://developers.bitex.la/?version=latest#f3eaffd6-5d16-45f6-a15a-34e83ebdea32)
endpoints for managing your account funds.

#### Individual accounts for each Asset Manager customer.

Bitex can be used as a __White Label__ SAAS that lets you create individual accounts
for each one of your customers.

Each customer will have their own balance, and will be subject to a regular
risk based compliance program. This method is more accesible for firms that
don't have an adequate compliance program  and regulation for the jurisdictions
Bitex works with, but still have a large customer base.

Learn about the [master user role](/docs/authentication/user).

Set up your integration for creating and [managing multiple user accounts](/docs/users/welcome/),
a process that includes compliance due dilligence, but still
fully contained in an API.

Then read the [public market
data](https://developers.bitex.la/?version=latest#d7e259a6-b126-4d4c-ae66-b456242d33a6) endpoints
to see what's going on in the markets.

Then use your API key to [place orders, cancel them, and see your
trades](https://developers.bitex.la/?version=latest#6d5f5991-ba42-448f-9583-3b4d48e18350)
on behalf of your customers.

Also look at the
[deposit](https://developers.bitex.la/?version=latest#e6d2a366-043b-4173-9b80-ed68f62341b7)
and [withdraw](https://developers.bitex.la/?version=latest#f3eaffd6-5d16-45f6-a15a-34e83ebdea32)
endpoints for managing each customer's account funds.
