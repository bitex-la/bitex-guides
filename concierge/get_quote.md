# Get a quote

Once you're done indicating all the outputs, request a quote from us.

```
curl -X POST "https://sandbox.bitex.la/api/concierge_requests/6/request_quote" \
  --header "Authorization: your_api_key"
```

Your quote may or may not be produced automatically, so you will get an ETA. (In some rare cases you may have to wait for your quote on business hours.). 
The ETA is a short period of time, in general around 20 minutes, but could be done immedately in some cases.

At this point, you will have until `cancellable_until` to [Cancel](/concierge/cancelling) the order, if you did not, the order will be accepted automatically and the payment process will start.

Learn more about how to request a quote in the
[API Reference](https://developers.bitex.la/#9f8d8570-db6b-4f1f-8d0c-8cb440bf7f5c).

<div class="footer-nav">
  <span>
    Back:
    <a href="/concierge/request">Create a Concierge Request</a>
  </span>
  <span class="forth">
      Next: 
      <a href="/concierge/wait">Wait for your quote</a>
  </span>
</div>





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