---
layout: doc
title: "States Summary"
section: Concierge
index: 11
---

### A `Request` lifecycle is as follows:

<h4><span class="badge badge-dark">draft</span></h4>
You've just set the origin `port` and are in the process of
adding `Outputs`.
<br/>
Next should be <span class="badge badge-primary">quote_requested</span>
when you request a quote.
<br/>
But it can also be <span class="badge badge-warning">cancelled</span>
if you cancel it.


<h4><span class="badge badge-primary">quote_requested</span></h4>
You're done adding `Outputs` and now request a quote for them.
<br/>
You'll receive an ETA for your quote and will remain waiting for it.
<br/>
Next should be <span class="badge badge-primary">quoted</span>
once we give you a quote.
<br/>
Or you can still make it <span class="badge badge-warning">cancelled</span>.

<h4><span class="badge badge-primary">quoted</span></h4>
We gave you a quote, you've got a window of time before `cancellable_until`
to cancel the `Request` if you don't agree.
<br/>
Next could be <span class="badge badge-primary">working</span>.
<br/>
Or you can still make it <span class="badge badge-warning">cancelled</span>.

<h4><span class="badge badge-primary">Working</span></h4>
Once the `Request` started working, it's time to follow the
`Outputs` as they progress.
<br/>
Next state should be <span class="badge badge-success">finished</span>
once all outputs reach a final state.

<h4><span class="badge badge-success">Finished</span></h4>
All outputs have reached a final state.

<h4><span class="badge badge-warning">Cancelled</span></h4>
You've cancelled the `Request`, no hard feelings.

<br/>
<hr/>

### An `Output` lifecycle is as follows:

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
Next may be <span class="badge badge-primary">settled</span>
or <span class="badge badge-warning">cancelled</span> depending on how
the `Request` unfolds.

<h4><span class="badge badge-primary">settled</span></h4>
The payment was done and the recipient's bank confirmed it.

<h4><span class="badge badge-warning">rejected</span></h4>
Preliminary checks did not pass, so we didn't start the payout process,
your funds were not used.

<h4><span class="badge badge-warning">cancelled</span></h4>
You cancelled the request, and this `Output` along with it.
Outputs that were previously rejected, do not change their state.

<h4><span class="badge badge-danger">returned</span></h4>
We could not process the final leg of the payment after reaching the
destination `port`.
Likely due to erroneous or invalid `WithdrawalInstructions`.
Your funds were used and there may be a cost for returning them.
