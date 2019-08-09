
# Cancelling a Request

A `Request` can be cancelled when it is `draft`, `quote_requested` or `quoted`.

To do it, how have to:

```
curl -X POST "https://sandbox.bitex.la/api/concierge_requests/6/cancel" \
  --header "Authorization: your_api_key"
```

Learn more about how to cancel a `Request` in the
[API Reference](https://developers.bitex.la/#6b27b5ea-7770-4779-93fd-6c74874f004a).

<div class="footer-nav">
  <span>
    Back:
    <a href="/docs/concierge/">Concierge Index</a>
  </span>
</div>