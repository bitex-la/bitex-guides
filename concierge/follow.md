
# Follow the money as payments are made

At this point the `Request` will be in a `working` state and, as usual, you will be notified with a [Callback](/bitex-guides/concierge/callbacks).

Now, you have to track the state of each output. The output states could be:

  - **`rejected`**:  Our Compliance validations did not pass.
  - `working`:   We are trying to send the money to the target port.
  - **`cancelled`**: This payment was cancelled while working on it.
  - **`settled`**:   The payment was settled.
  - **`returned`**:  Some external agent could not process the payment.

[Callbacks](/bitex-guides/concierge/callbacks) will be triggered as soon as each payment progresses, and of course, you could query the output state manually:

```
curl "https://sandbox.bitex.la/api/concierge_request_outputs?filter[request_id]=6" \
  --header "Authorization: your_api_key"
```

<div class="footer-nav">
  <span>
    Back:
    <a href="/bitex-guides/concierge/wait">Wait for your quote</a>
  </span>
  <span class="forth">
      Next: <a href="/bitex-guides/concierge/once">Once it’s done, it’s done.</a>
  </span>
</div>
