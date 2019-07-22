
# Wait for your quote to be ready at the estimated time.

Once we quote your Request, it will be in a `quoted` state and you will be notified with a [Callback](/concierge/callback).

You can also poll your Request to see its status and quote:

```
curl --location --request GET "https://sandbox.bitex.la/api/concierge_requests/6" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.0"
```

At this point, you will have approximately 15 minutes to [Cancel](/concierge/cancelling) the order, if you did not, the order will be accepted automatically and the payment process will start.

<br/>
<hr/>
<p style="text-align:left;">
    <a href="/concierge/request_quote">Request Quote</a>
    <span style="float:right;">
        <a href="/concierge/follow">Follow the money</a>
    </span>
</p>