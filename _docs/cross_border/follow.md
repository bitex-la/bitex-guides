---
layout: doc
title: "Get progress updates"
section: CrossBorder
index: 5
---
When the `Request` gets to a 
<span class="badge badge-primary">working</span> state, it's time to 
turn to each `RequestOutput` to see what progress is being done on the
recipient's end.

The possible `RequestOutput` states are:
  - <span class="badge badge-primary"> accepting </span>
    Preeliminary checks, like compliance review, are still in progress.
  - <span class="badge badge-primary"> accepted </span>
    Preeliminary checks have passed. Once funds credit on the `Request`
    this `RequestOutput` will start working.
  - <span class="badge badge-warning"> rejected </span>
    Preliminary checks failed, so we won't start the payout process.
    Funds will be returned to the payer in full, including the service fee.
  - <span class="badge badge-primary">working</span>
    We are working on getting the funds to the destination port.
  - <span class="badge badge-primary">settling</span>
    The payment was issued from our bank account, but we've not received
    confirmation from the receiving bank.
  - <span class="badge badge-success">settled</span>
    The payment was completed correctly and the receiving bank confirmed it.
  - <span class="badge badge-danger">failed</span>
    The payment failed, most likely due to wrong `WithdrawalInstructions`.
    We should get in touch to resolve the Issue and try again.
  - <span class="badge badge-danger">returned</span>
    We could not process a failed payment after several retries, as the payer
    could not provide viable `WithdrawalInstructions`.
    Funds will be returned to the payer, minus fees.
  - <span class="badge badge-danger">cancelled</span>
    The `Request` was cancelled and this `RequestOutput` was either `accepting`
    or `accepted`.

[Callbacks](/docs/callbacks) will be triggered for each `RequestOutput` state change,
and of course, you could also poll all your `RequestOutputs` states like so:

{% highlight javascript %}
$ curl "https://sandbox.bitex.la/api/concierge_request_outputs?filter[request_id]=10101" \
  --header "Authorization: your_api_key"
{% endhighlight %}
