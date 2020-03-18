---
layout: doc
title: "Quoting"
section: CrossBorder
index: 4
---
Once you're done defining all the `RequestOutputs`, youll ask for a quote from Bitex.

Quoting a `Request` means it will have a `total_to_spend` value, expressed in
payer currency, representing the amount to be deducted from the payer's Bitex
balance in order move forward and pay all the `RequestOutputs`.
Also, all `RequestOutputs` created using an `amount` will have a calculated `budget`
and vice-versa.

Getting a Quote for your `Request` goes as follows

#### 1. You Ask for a quote

When you ask for a quote for a `Request`, Bitex may not provide it synchronously,
instead we promise to have a quote ready by a certain date and time, and we also
let you know how long you have to accept the quote if you find it suitable and
and how long you will have to provision funds to the payer's Bitex balance.

We do this by setting the `eta`, `accept_quote_before` and `provision_funds_before`
fields respectively.

The ETA could be just a few seconds or maybe hours away, 
depending on your source and destination ports,
and your service level agreement with Bitex.

Quotes for `Ports` in Argentina, Chile, México, Paraguay and Uruguay are not
delayed.


Here's how you ask for a quote for your `Request`:

{% highlight javascript %}
$ curl -X POST "https://sandbox.bitex.la/api/concierge_requests/1010/request_quote" \
  --header "Authorization: your_api_key"

Response:

{
  "data": {
    "id": "143",
    "type": "concierge_requests",
    "attributes": {
      "state": "quote_requested",
      "port_code": "ar_usd",
      "outputs_count": 1,
      "eta": "2019-11-25T12:53:02.741Z",
      "quote_requested_at": "2019-11-25T12:53:02.741Z",
      "accept_quote_before": "2019-11-25T13:03:02.741Z",
      "quote_accepted_at": null,
      "total_to_spend": null,
      "funds_available": 0,
      "provision_funds_before": "2019-11-26T01:03:02.741Z",
      "cancellation_reason": null,
      "receipt_url": null,
      "credit_note_url": null,
      "external_id": null,
      "payment_authorization_code": null
    },
    "relationships": {
      "user": { "data": { "id": "1", "type": "users" } },
      "outputs": { "data": [ { "id": "115", "type": "concierge_request_outputs" } ] }
    }
  }
}

{% endhighlight %}

Asking for a quote will move your `Request` from the 
<span class="badge badge-dark">draft</span> state into
<span class="badge badge-primary">quote_requested</span>.

#### 2. Bitex provides the quote.

Your `Request` will have a maximum `eta` (Estimated Time of Arrival) for the quote.
Once Bitex quotes it, your `Request` will move from the
<span class="badge badge-primary">quoted_requested</span> state, into
<span class="badge badge-primary">quoted</span> and
you will also be notified with a `WebCallback`.

You can also poll your `Request` to see its progress, at some point
it will be <span class="badge badge-primary">quoted</span> and the
`total_to_spend` will be set.

{% highlight javascript %}
$ curl "https://sandbox.bitex.la/api/concierge_requests/1010" \
  --header "Authorization: your_api_key"

Response:
{ 
  "data": {
    "id": "1010",
    "type": "concierge_requests",
    "attributes": {
      "state": "quoted",
      "total_to_spend": 10500.0,
      ...snip...
    },
    ...snip...
  }
}

{% endhighlight %}

#### 3. You see and Accept the quote.

Once the quote is provided, you have up until the date of `accept_quote_before`
to explicitly accept the quoted price.

If you accept it, 
the `Request` will move to the <span class="badge badge-primary">quote_accepted</span>
state.

As soon as the `total_to_spend` funds are available on the payer account, the `Request`
will move again to the <span class="badge badge-primary">working</span> state,
and all `ReqestOutputs` in the
<span class="badge badge-primary">accepted</span>
state will eventually move to
<span class="badge badge-primary">working</span>.

When you accept the quote, you commit to have the `total_to_spend` available in
the payer's Bitex balance some time before `provision_funds_before`.

It's your responsibility to provision funds also considering the 
the time it may take for your transfer to credit on Bitex.
If the funds don't credit on time, 
the `Request` will be <span class="badge badge-warning">cancelled</span>.

If you don't agree with the quote, you don't need to accept it and
the `Request` will be eventually be <span class="badge badge-warning">cancelled</span>.

