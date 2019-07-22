# Requesting a Quote

Once you're done indicating all the outputs, request a quote from us.

```
curl --location --request POST "https://sandbox.bitex.la/api/concierge_requests/6/request_quote" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --data ""
```

Your quote may or may not be produced automatically, so you will get an ETA. (In some rare cases you may have to wait for your quote on business hours.). 
The ETA is a short period of time, in general around 20 minutes, but could be done immedately in some cases.

You could [Cancel](/concierge/cancelling) the request if you wish.

<br/>
<hr/>
<p style="text-align:left;">
    <a href="/concierge/request">Request</a>
    <span style="float:right;">
        <a href="/concierge/wait">Wait for quotation</a>
    </span>
</p>