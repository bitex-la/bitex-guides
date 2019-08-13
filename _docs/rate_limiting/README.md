---
layout: doc_full
title: "Quotas and Rate Limiting"
description: "Some notes about DDOS and (not) stressing our API."
topic: true
---

# Quotas, Rate Limiting, DDOS protection

Please limit your usage to 5 requests a second, running over that limit may result in a 429 HTTP
response status.

Our DDOS mitigation service is [Cloudflare.com](https://www.cloudflare.com/).

In some cases, cloudflare may block you or challenge you if you're accessing
from a blacklisted IP or if your usage pattern seems malicious.

If you're being mistakenly filtered please contact us
at [developers@bitex.la](mailto:developers@bitex.la) so we can evaluate your case and whitelist your IP.

<br/>
<hr/>
[Back to Guides index](/)
