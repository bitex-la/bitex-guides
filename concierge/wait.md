
# Wait for your quote to be ready at the estimated time.

Once we quote your `Request`, it will be in a `quoted` state and you will be notified with a [Callback](/concierge/callback).

You can also poll your `Request` to see its status and quote:

```
curl "https://sandbox.bitex.la/api/concierge_requests/6" \
  --header "Authorization: your_api_key"
```

At this point, you will have approximately 15 minutes to [Cancel](/concierge/cancelling) the order, if you did not, the order will be accepted automatically and the payment process will start.

<div class="footer-nav">
  <span>
    Back:
    <a href="/concierge/get_quote">Get a quote</a>
  </span>
  <span class="forth">
      Next: 
      <a href="/concierge/follow">Follow the money</a>
  </span>
</div>