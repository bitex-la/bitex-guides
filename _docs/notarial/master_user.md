---
layout: doc
title: "Role: Master User"
section: API Authentication
index: 4
---

You can request Master User access if you need to create and manage multiple Bitex accounts.
With this role, you will be able to create new users, and act on their behalf.

**Master User** access is required, for example, if you
want to use our concierge service for cross border remittances and mass disbursements.

**Master User** access is **not self-serviced** (but there's no extra cost associated with it).
[Contact our sales team](mailto:comercial@bitex.la) and tell us more about your use case.

### Get User access

Go through all the steps for creating an API key. See [Role: User](/docs/authentication/user).

### Request Master User status

Once you have your API key, contact us so that we can bless it with Master User access.

For **Sandbox**, just drop us a line to [developers@bitex.la](mailto:developers@bitex.la).

For **Production**, we'll grant **Master User** access once we've validated your **Sandbox** integration.

### Try out your Master User API access

To use your API key for managing users, just send it in an `Authorization:` header as required.

{% highlight javascript %}
curl -X POST "https://Sandbox.bitex.la/api/users" \
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
{% endhighlight %}

See the [Users API Reference](https://developers.bitex.la/?version=latest#86c5d36b-3f74-499f-817e-38f9a3d789ce)
for more endpoints available exclusively to Master Users.

You can also act on behalf of any of the `Users` you have created. You can use any endpoint available
to Bitex `Users`, as long as you specify that `User's` ID in your **Authorization** header.

For example, this is how you would list a `User's` crypto balances.

{% highlight javascript %}
curl --location --request GET "https://Sandbox.bitex.la/api/coin_wallets" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=123"
{% endhighlight %}

Don't forget to check the [API Reference](https://developers.bitex.la/) to learn about
all the things you can do with your Bitex **Master User** access.
