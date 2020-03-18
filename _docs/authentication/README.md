---
layout: doc_full
featured_title: API Authentication
title: "API Authentication"
description: "Learn about API access roles, and how to get them."
topic: true
section: API Authentication
index: 1
---

Bitex has 2 API user roles, **Regular** `User` and **Master** `User`.

**Regular** `Users` can use all the API endpoints to manage their own data,
such as checking balances, issuing withdrawals, trading. 

A **Master** `User` can do anything a **Regular** `User` can, plus they can
create other `Users` and manage their data too.

Only **Master** `Users` have access to the [CrossBorder](/docs/cross_border/welcome) API endpoints to send
payments between the `Users` they manage.

Some API endpoints don't need authentication.
For example, the [Market Data](https://developers.bitex.la/#d7e259a6-b126-4d4c-ae66-b456242d33a6)
endpoints don't expect an `ApiKey`.

Follow these steps to set up your `User` and get the role you need.

### 1. Create your Account.

Sign up with an email and password at
[https://sandbox.bitex.la/auth/sign-up](https://sandbox.bitex.la/auth/sign-up)
for **sandbox** or [https://bitex.la/auth/sign-up](https://sandbox.bitex.la/auth/sign-up) for
**production**.

You should sign up in our **sandbox** environment then replicate the steps in **production**.
We suggest you take look at our [Sandbox Guide](/docs/sandbox/README).

### 2. Complete the KYC procedures.

The Know Your Customer procedure is an essential part of every Bitex account opening.

On **sandbox** you don't need to submit any data. To get your `Account` approved
send an email to [developers@bitex.la](mailto:developers@bitex.la) and tell us which email you signed up with.

For **production** you should wait for our team to review your data approve your account,
it takes about a day for us to get back to you.

### 3. Create your `ApiKey`

Theese are the links for managing your `ApiKeys` in [sandbox](https://sandbox.bitex.la/apikeys) and
[production](https://sandbox.bitex.la/apikeys).
Pay special attention to the available permissions.

It's a good idea to keep your **sandbox** `ApiKey` at hand even after you move to **production**.

To use your API just send it in an `Authorization:` header as required.

For example, this endpoint will show your own
[user details and balances](https://developers.bitex.la/?version=latest#828f08a8-5291-4287-92ab-360f8726abc7)

{% highlight javascript %}
curl --location --request GET "https://sandbox.bitex.la/api/users/me" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1"
{% endhighlight %}

Check the [API Reference](https://developers.bitex.la/) to learn about
other things you can do with your **Regular User** access.

### 4. Harden Security.

This step is optional for **sandbox**, but it's always good to exercise.

We use modern TLS for our API endpoints so that you don't need to encrypt messages and prevent replay attacks
at the application level. 

Your main focus should be on keeping your `ApiKey` safe from the moment it is created.
Revoke your `ApiKeys` as soon as possible if you believe they have been compromised.

If you can, **tell us your IP addresses** so that we can **restrict access** and also **whitelist them** so
you don't get rejected by our DDOS mitigation service.

We can also offer mutual SSL upon your request, but it may have an associated setup fee.

### 5. Ask for **Master** `User` access.

Only if you need it, of course.  **Master** `User` access is required, for example, if you want to use our Cross-border service.

This type of access is **not self-serviced** (but there's no extra cost associated with it).
[Contact our sales team](mailto:comercial@bitex.la) and tell us more about your use case.

For **sandbox**, just drop us a line to [developers@bitex.la](mailto:developers@bitex.la).

For **production**, we'll grant t  once we've validated your **sandbox** integration.

Once you have **Master** `User` access your can use your API key to
[create more users](https://developers.bitex.la/?version=latest#bd7fc581-a944-416f-b1d2-d36219cef28f).

{% highlight javascript %}
curl -X POST "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1" \
  --data '{ "data": { "type": "users" } }'
{% endhighlight %}

And you can list all the users you manage (which will include yourself).

{% highlight javascript %}
curl -X GET "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1"
{% endhighlight %}
