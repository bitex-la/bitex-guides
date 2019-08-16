---
layout: doc_full
title: "Authentication"
description: "Learn what kindof API access you need, and how to get it."
topic: true
---

# Authentication and Authorization

**We have 3 API access roles** and want to help you figure out which one you need,
how to get it, and how to use it. Those roles are General Public, Bitex User, and Bitex Master User.

## Role 1: General Public, no signup required!

Anyone can read the market data, transaction history,
reference exchange rates, and other data services. Go ahead, try the tickers endpoint right away:

{% highlight javascript %}
curl https://sandbox.bitex.la/api/tickers
{% endhighlight %}

See more public endpoints in the [Market Data](https://developers.bitex.la/#d7e259a6-b126-4d4c-ae66-b456242d33a6)
API reference.

## Role 2: Bitex Users

People who have signed up for a Bitex account can manage
their own API keys and access all endpoints related to their balances,
deposits and withdrawals.
They can also trade in the exchange and process
incoming bitcoin payments to their account.

You can get this type of access by signing up for a Bitex user account,
start in our sandbox and then do the same for our production environment.

We suggest you take look at our [Sandbox Guide](/sandbox).

### First step: Sign up in for a Bitex account.

For sandbox it's [https://sandbox.bitex.la/auth/sign-up](https://sandbox.bitex.la/auth/sign-up).

For production it's [https://bitex.la/auth/sign-up](https://sandbox.bitex.la/auth/sign-up).

### Second step: Fill in your details and wait for your account to be approved.

To get a **sandbox account** you can submit bogus data, to get it approved
send an email to [developers@bitex.la](mailto:developers@bitex.la) and tell us which email you signed up with.

For **production** you should wait for our team to approve your account,
it takes about a day for us to get back to you.

### Third step: Create your API key

Either in [sandbox](https://sandbox.bitex.la/apikeys) or in 
[production](https://sandbox.bitex.la/apikeys).
Pay special attention to the available permissions.

We use modern TLS for our API endpoints so that you don't need to encrypt messages and prevent reply attacks
at the application level. 

Just focus on keeping your API key safe from the moment it's created.
Revoke your keys as soon as possible if you believe they have been compromised.

We can also offer mutual SSL upon your request, but it may have an associated setup fee.

### Finally: Try out your API key.

To use your API just send it in an `Authorization:` header as required.

For example, this is how you would list your [crypto coin balances](https://developers.bitex.la/#fa6a0343-880b-4944-83ae-9a8e7367e3df).

```
curl --location --request GET "https://sandbox.bitex.la/api/coin_wallets" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1"
```

Check the [API Reference](https://developers.bitex.la/) to learn about
all the things you can do with your Bitex User access.

**Pro Tip:** Keep your sandbox access at hand even after you move to production.

## Role 3: Bitex Master User
You can request Master User access if you need to create and manage multiple Bitex accounts.

With this role, you would be able to create new users, and act on their behalf.

Master User access is required, for example, if you
want to use our concierge service for cross border remittances and mass disbursements.

Master User access is not self-serviced (but there's no extra cost associated with it).
[Contact our sales team](mailto:comercial@bitex.la) and tell us more about your use case.

### First Step: Get Bitex User access.

Go through all the steps for creating an API key. See [Role 2: Bitex User](/docs/authentication/README#role-2-bitex-users)

### Second Step: Request Master User status

Once you have your API key, contact us so that we can bless it with Master User access.

For **sandbox**, just drop us a line to [developers@bitex.la](mailto:developers@bitex.la).

For **production**, we'll grant Master User access once we've validated your sandbox integration.

### Finally: Try out your Master User API access.

To use your API key for managing users, just send it in an `Authorization:` header as required.

```
curl -X POST "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key" \
  --header "Version: 2.1" \
  --data '{
    "data": {
        "type": "users",
        "attributes": {
            "email": "test@master-user.com",
            "password": "password"
        }
    }
}'
```

See the [Users API Reference](https://developers.bitex.la/?version=latest#86c5d36b-3f74-499f-817e-38f9a3d789ce)
for more endpoints available exclusively to Master Users.

You can also act on behalf of any of the users you have created. You can use any endpoint available
to Bitex User's, as long as you specify that user's ID in your authorization header.

For example, this is how you would list a user's crypto balances.

```
curl --location --request GET "https://sandbox.bitex.la/api/coin_wallets" \
  --header "Content-Type: application/json" \
  --header "Authorization: jruFCnab2539vwj2s684nsga82nda; user=123"
```

Don't forget to check the [API Reference](https://developers.bitex.la/) to learn about
all the things you can do with your Bitex Master User access.

<br/>
<hr/>
[Back to Guides index](/)
