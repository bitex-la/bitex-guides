---
layout: doc
title: "States Summary"
section: CrossBorder
index: 7
---

#### A `Request` lifecycle is as follows:

<h4><span class="badge badge-dark">draft</span></h4>
You've just set the origin `port` and are in the process of
adding `RequestOutputs`.
<br/>
Next should be <span class="badge badge-primary">quote_requested</span>
when you request a quote.
<br/>
It will be <span class="badge badge-warning">cancelled</span>
if you abandon it without requesting a quote.


<h4><span class="badge badge-primary">quote_requested</span></h4>
You're done adding `RequestOutputs` and now request a quote for it.
<br/>
You'll receive an ETA for your quote and will remain waiting for it.
<br/>
Next should be <span class="badge badge-primary">quoted</span>
once we give you a quote.

<h4><span class="badge badge-primary">quoted</span></h4>
We gave you a quote and are waiting for you to accept it.
<br/>
Next could be <span class="badge badge-primary">working</span>.
<br/>
Or it will be <span class="badge badge-warning">cancelled</span>
if you don't accept the quote before `accept_quote_before`.

<h4><span class="badge badge-primary">quote_accepted</span></h4>
You accepted the quote, so the `Request` is waiting for funds to
be provisioned to the payer Bitex account.
<br/>
Next state should be <span class="badge badge-primary">working</span>
once funds are available.
<br/>
It will be <span class="badge badge-warning">cancelled</span>
if funds are not available before the `provision_funds_before` date.

<h4><span class="badge badge-primary">working</span></h4>
Once the `Request` started working, it's time to follow the
`RequestOutputs` as they progress.
<br/>
Next state should be <span class="badge badge-success">finished</span>
once all outputs reach a final state.

<h4><span class="badge badge-success">finished</span></h4>
All outputs have reached a final state.

<h4><span class="badge badge-warning">cancelled</span></h4>
The request was cancelled. No payments were made.

<br/>
<hr/>
<br/>

#### A `RequestOutput` lifecycle is as follows:

<h4><span class="badge badge-dark">accepting</span></h4>
The output has just been created, preliminary checks have not run yet.
<br/>
Next could be <span class="badge badge-primary">accepted</span>
or <span class="badge badge-warning">rejected</span> depending on the result.

<h4><span class="badge badge-primary">accepted</span></h4>
Preliminary checks were successful, so we can move forward as soon as
the `Request` is quoted and ready to start working.
<br/>
Next may be <span class="badge badge-primary">working</span>
or <span class="badge badge-warning">cancelled</span> depending on how
the `Request` unfolds.

<h4><span class="badge badge-primary">working</span></h4>
We are working on getting the funds to the destination port.
The `Request` should be in it's own <span class="badge badge-primary">working</span> state.
<br/>
Next may be <span class="badge badge-primary">settling</span>
or <span class="badge badge-warning">cancelled</span> depending on how
the `Request` unfolds.

<h4><span class="badge badge-primary">settling</span></h4>
The payment was issued from our bank account, but we've not received
confirmation from the receiving bank.
<br/>
Next may be <span class="badge badge-primary">settled</span>
or <span class="badge badge-warning">failed</span>.

<h4><span class="badge badge-primary">settled</span></h4>
The payment was done and the recipient's bank confirmed it.

<h4><span class="badge badge-primary">failed</span></h4>
Settlement failed, most likely to do an error in `WithdrawalInstructions`
The payment can be retried.
<br/>
Next may be <span class="badge badge-primary">working</span>
or <span class="badge badge-warning">returned</span>.

<h4><span class="badge badge-warning">rejected</span></h4>
Preliminary checks did not pass, so we didn't start the payout process,
your funds were not used.

<h4><span class="badge badge-warning">cancelled</span></h4>
You cancelled the request, and this `Output` along with it.
Outputs that were previously rejected, do not change their state.

<h4><span class="badge badge-danger">returned</span></h4>
We could not process a failed payment after several retries, as the payer
could not provide viable `WithdrawalInstructions`.
Funds will be returned to the payer, minus fees.
