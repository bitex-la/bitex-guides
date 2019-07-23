
# User creation

```
curl --location --request POST "https://bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: whitelabel_api_key" \
  --header "Version: 2.1" \
  --data "{
    \"data\": {
        \"type\": \"users\",
        \"attributes\": {
            \"email\": \"test@whitelabeler.com\",
            \"password\": \"password\"
        }
    }
}"```

<br/>
<hr/>
<p style="text-align:left;">
    <a href="/concierge/xxxx">xxxx</a>
    <span style="float:right;">
        <a href="/concierge/xxxx">xxxx</a>
    </span>
</p>