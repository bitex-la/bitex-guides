---
layout: doc_full
title: "Create a new User"
description: "Create a new User"
date: 2018-12-08 8:14:30 +0600
post_image: assets/images/service-icon3.png
category_name: Remittances and mass disbursements
category_slug: concierge
---

# Create a new User

You need a user for every `Request Output`, you can create a new one this way: 

```
curl -X POST "https://sandbox.bitex.la/api/users" \
  --header "Content-Type: application/json" \
  --header "Authorization: whitelabel_api_key" \
  --data "{
    \"data\": {
        \"type\": \"users\",
        \"attributes\": {
            \"email\": \"test@master-user.com\",
            \"password\": \"password\"
        }
    }
}"
```

Approval from our Compliance department is required before the payment process can begin.

Learn more in the [Users API reference](https://developers.bitex.la/#86c5d36b-3f74-499f-817e-38f9a3d789ce).

<div class="footer-nav">
  <span>
    Back:
    <a href="/docs/concierge/">Concierge Index</a>
  </span>
</div>
