---
layout: doc
title: "Role: User"
section: API Authentication
index: 3
---

People who have signed up for a Bitex account can manage
their own API keys and access all endpoints related to their balances,
deposits and withdrawals.
They can also trade in the exchange and process
incoming bitcoin payments to their account.

You can get this type of access by signing up for a Bitex user account,
start in our sandbox and then do the same for our production environment.

We suggest you take look at our [Sandbox Guide](/docs/sandbox/README).

### Sign up in for a Bitex account

The URL's are [https://sandbox.bitex.la/auth/sign-up](https://sandbox.bitex.la/auth/sign-up)
and [https://bitex.la/auth/sign-up](https://sandbox.bitex.la/auth/sign-up) for
**sandbox** and **production** respectively.

### Complete the Know Your Customer procedures

The KYC procedure is an essential part of every Bitex account opening.

To get a **sandbox account** you can submit bogus data, to get it approved
send an email to [developers@bitex.la](mailto:developers@bitex.la) and tell us which email you signed up with.

For **production** you should wait for our team to approve your account,
it takes about a day for us to get back to you.

### Create your API key

Either in [sandbox](https://sandbox.bitex.la/apikeys) or in 
[production](https://sandbox.bitex.la/apikeys).
Pay special attention to the available permissions.

We use modern TLS for our API endpoints so that you don't need to encrypt messages and prevent reply attacks
at the application level. 

Just focus on keeping your API key safe from the moment it's created.
Revoke your keys as soon as possible if you believe they have been compromised.

We can also offer mutual SSL upon your request, but it may have an associated setup fee.

### Try out your API key

To use your API just send it in an `Authorization:` header as required.

For example, this is how you would list your [crypto coin balances](https://developers.bitex.la/#fa6a0343-880b-4944-83ae-9a8e7367e3df).

{% highlight javascript %}
curl --location --request GET "https://sandbox.bitex.la/api/coin_wallets" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1"
{% endhighlight %}

Check the [API Reference](https://developers.bitex.la/) to learn about
all the things you can do with your Bitex User access.

<div class="alert alert-info">
  Keep your sandbox access at hand even after you move to production.
</div>
