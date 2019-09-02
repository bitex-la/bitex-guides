---
layout: doc
title: Create a User
section: User Management
index: 2
---

You start creating a `User` with just an email and a password. 
We rely on you to confirm this email address is correct, you can use
a bogus email address if you want to.

There are two main use cases for `User` accounts created by a `Master User`.

### Private Access

If the `User` accounts you create are only for your internal use, we suggest
you make up an email address in your domain, and a random password.

Addresses like `user+1234@yourdomain.com` are valid and encouraged, where 1234
could be their ID in your database.

### Shared Access

You may share access with them by using their own email address,
and a password you both know.  You could also create a random password
and request they reset it using the
[reset password form](https://bitex.la/auth/password/retrieve).

### Let's get to it

To create a user just post their credentials to the users endpoint like so

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key" \
  --header "Version: 2.1" \
  --data '{
    "data": {
        "type": "users",
        "attributes": {
            "email": "test+1234@example.com",
            "password": "5up3r-r4nd0m"
        }
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
