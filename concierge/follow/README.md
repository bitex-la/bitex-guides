
# Follow the money as payments are made
  - Mention what's the request state at this point.
  - The tracking is done per-output.
  - Talk in depth about all the states an output may have.
    - What's each state, what happened for it to get to that state.
  - Mention they will get web callbacks for each payment as it progresses. (link to callbacks guide)

At this point the Request will be in a `working` state and, as usual, you will be notified with a [Callback](/concierge/callback).

Now, you have to track the state of each output. The output states could be:

  - rejected:  Our Compliance validations did not pass.
  - working:   We are trying to send the money to the target port.
  - cancelled: This payment was cancelled while working on it.
  - settled:   The payment was settled.
  - returned:  Some external agent could not process the payment.

[Callbacks](/concierge/callback) will be triggered as soon as each payment progresses, and of course, you could query the output state manually:

```
curl --location --request GET "https://sandbox.bitex.la/api/concierge_request_outputs?filter[request_id]=6" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.1"
```

<br/>
<hr/>
<p style="text-align:left;">
    <a href="/concierge/wait">Wait...</a>
    <span style="float:right;">
        <a href="/concierge/once">Once it’s done, it’s done.</a>
    </span>
</p>



    - accepting: For compliance, withdrawal instructions, general sanity.
    - rejected:  Validations did not pass.
    - accepted:  All validations completed, but no engine has been assigned.
    - working:   Engine is not done/settled yet.
    - cancelled: This payment was cancelled while working on it
    - settled:   Engine is settled
    - returned:  Some external agent could not process the payment.

