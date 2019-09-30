---
layout: doc
title: Create a User
section: User Management
index: 2
---

You start creating a `User`. 

We will create a random email with the following template "(random_string)_whitelabeler.id@bitex.la" and a random password.

### Let's get to it

To create a user just make a post request to the users endpoint like so

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key" \
  --header "Version: 2.1" \
  --data '{
    "data": {
        "type": "users"
    }
  }'

Response:

{ "data": {
    "id": "692",
    "type": "users",
    "attributes": {
      "name": "test+1234@example.com",
      "email": "test+1234@example.com",
      "kyc_accepted": false,
      "otp_enabled": false,
      "do_not_email": false,
      "trezor_login_enabled": false
    }
  }
}
{% endhighlight %}

Learn more about creating, listing and showing your user's data in the
[Users API
reference](https://developers.bitex.la/?version=latest#86c5d36b-3f74-499f-817e-38f9a3d789ce)
