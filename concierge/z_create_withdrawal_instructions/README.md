
# Withdrawals instructions creation

```
curl --location --request POST "https://bitex.la/api/withdrawal_instructions" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --data "{
	\"data\": {
		\"type\": \"withdrawal_instructions\",
		\"attributes\": {
			\"label\": \"Local Bank\",
			\"body\": {
				\"name\": \"John Doe\",
				\"city\": \"Buenos Aires\",
				\"phone\": \"+54 11 12341234\",
				\"cuit\": \"23123412349\",
				\"address\": \"My Address 123\",
				\"bank\": \"hsbc\",
				\"bank_account_number\": \"12341234\",
				\"cbu\": \"1234123412341234\",
				\"account_type\": \"savings\",
				\"currency\": \"ARS\",
				\"country\": \"AR\",
				\"payment_method\": \"domestic_bank\"
			}
		}
	}
}"
```

<br/>
<hr/>
<p style="text-align:left;">
    <a href="/concierge/xxxx">xxxx</a>
    <span style="float:right;">
        <a href="/concierge/xxxx">xxxx</a>
    </span>
</p>