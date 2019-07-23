# Requesting a Quote

Once you're done indicating all the outputs, request a quote from us.

```
curl --location --request POST "https://sandbox.bitex.la/api/concierge_requests/6/request_quote" \
  --header "Authorization: your_api_key"
```

Your quote may or may not be produced automatically, so you will get an ETA. (In some rare cases you may have to wait for your quote on business hours.). 
The ETA is a short period of time, in general around 20 minutes, but could be done immedately in some cases.

At this point, you will have until `cancellable_until` to [Cancel](/concierge/cancelling) the order, if you did not, the order will be accepted automatically and the payment process will start.



```
{
    "data": {
        "id": "1",
        "type": "concierge_requests",
        "attributes": {
            "state": "quote_requested",
            "port_code": "ar_ars",
            "outputs_accepting": 0,
            "outputs_rejected": 0,
            "outputs_accepted": 1,
            "outputs_working": 0,
            "outputs_cancelled": 0,
            "outputs_settled": 0,
            "outputs_returned": 0,
            "outputs_total": 1,
            "eta": "2000-01-01T00:20:00.000Z",
            "cancellable_until": "2000-01-01T00:35:00.000Z"
        },
        "relationships": {
            "user": {
                "data": {
                    "id": "5",
                    "type": "users"
                }
            },
            "outputs": {
                "data": [
                    {
                        "id": "1",
                        "type": "concierge_request_outputs"
                    }
                ]
            }
        }
    }
}
```

<br/>
<hr/>
<p style="text-align:left;">
    <a href="/concierge/request">Request</a>
    <span style="float:right;">
        <a href="/concierge/wait">Wait for quotation</a>
    </span>
</p>