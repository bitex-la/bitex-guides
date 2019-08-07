
# Create a new User

You need a user for every `Request Output`, you can create a new one this way: 

```
curl -X POST "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: whitelabel_api_key" \
  --data "{
    \"data\": {
        \"type\": \"users\",
        \"attributes\": {
            \"email\": \"test@whitelabeler.com\",
            \"password\": \"password\"
        }
    }
}"
```

Approval from our Compliance department is required before the payment process can begin.

Learn more in the [Users API reference](https://developers.bitex.la/#86c5d36b-3f74-499f-817e-38f9a3d789ce).

<div class="footer-nav">
  <span>
    Back:
    <a href="/concierge/">Concierge Index</a>
  </span>
</div>