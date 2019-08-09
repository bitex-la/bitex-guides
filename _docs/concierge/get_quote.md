---
layout: doc
title: "Get a quote"
description: "Get a quote"
date: 2018-12-08 8:14:30 +0600
post_image: assets/images/service-icon3.png
category_name: Remittances and mass disbursements
category_slug: concierge
---

# Get a quote

Once you're done indicating all the outputs, request a quote from us.

```
curl -X POST "https://sandbox.bitex.la/api/concierge_requests/6/request_quote" \
  --header "Authorization: your_api_key"
```

Your quote may or may not be produced automatically, so you will get an ETA. (In some rare cases you may have to wait for your quote on business hours.). 
The ETA is a short period of time, in general around 20 minutes, but could be done immedately in some cases.

At this point, you will have until `cancellable_until` to [Cancel](/docs/concierge/cancelling) the order, if you did not, the order will be accepted automatically and the payment process will start.

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
