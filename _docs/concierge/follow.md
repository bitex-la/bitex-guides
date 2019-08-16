---
layout: doc
title: "Get progress updates"
section: Concierge
index: 9
---

At this point the `Request` will be in a `working` state and, as usual, you will be notified with a [Callback](https://developers.bitex.la/?version=latest#fbe8a54d-6785-4e9f-bc4d-f6cfe9e10f6a).

Now, you have to track the state of each output. The output states could be:

  - <span class="badge badge-warning"> rejected </span>
    Preliminary checks did not pass, so we didn't start the payout process,
    your funds were not used.
  - <span class="badge badge-primary">working</span>
    We are working on getting the funds to the destination port.
  - <span class="badge badge-success">settled</span>
    The payment was completed correctly and the receiving part confirmed it.
  - <span class="badge badge-danger">returned</span>
    We could not process the final leg of the payment after reaching the
    destination `port`.
    Likely due to erroneous or invalid `WithdrawalInstructions`.
    Your funds were used and there may be a cost for returning them.

[Callbacks](https://developers.bitex.la/?version=latest#fbe8a54d-6785-4e9f-bc4d-f6cfe9e10f6a) will be triggered as soon as each payment progresses, and of course, you could also poll all your `Outputs` states:

{% highlight javascript %}
$ curl "https://sandbox.bitex.la/api/concierge_request_outputs?filter[request_id]=10101" \
  --header "Authorization: your_api_key"
{% endhighlight %}
