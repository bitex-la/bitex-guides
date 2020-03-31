---
layout: doc_full
title: "WebHooks"
description: "Get notified about relevant events via web callbacks."
section: WebHooks
topic: true
---

When you create a [CrossBorder Request](/docs/cross_border/welcome) and you're
left waiting for it to reach destination, or when you create a
[Payment](/docs/payments/README/)
and are waiting for the customer to pay, it's possible that you'll end up
**polling data** from our API, until you see the change you expected.

If you rather use a **push model**, use our **WebHooks** feature, which pushes
relevant `Events` to you instead.

In order to receive `Events` you'll have to build an **HTTP server** 
and expose a single **URL** where we can **POST** the event payload
encoded as **JSON-API**. We call this server a **web-callbacks handler**.

Here's a general overview of the `Events` we will be sending you.

{% highlight javascript %}

{
   "data" : {
      "type" : "events",
      // Events have a unique identifier you can store on your end to make sure
      // you never handle the same event twice.
      "id" : "8",
      "attributes" : {
         // The event_type can be used for dispatching.
         // It's the general reason for the Event to be triggered.
         // The associated 'resource' will depend on the event_type.
         "event_type" : "user_enabled"

         // This is the date in which the event happened.
         "created_at" : "2000-01-01T00:00:00.000Z",

         // This is the date in which the Event was sent to you the first time.
         "sent_at" : "2000-01-01T00:00:00.000Z",
      },
      "relationships" : {
         "resource" : {
            "data" : {
               "type" : "concierge_requests",
               "id" : "1"
            }
         }
      }
   },
   "included" : [
     // The 'resource' attributes will be included. If that's not enough,
     // you need to fetch its relationships you can always poll for the
     // specific resource in your handler code.
     ...
   ]
}

{% endhighlight %}

There's no central listing of all available **webhooks**, but each API section
will introduce the webhooks relevant to each specific use case.

#### Regarding your **web-callbacks handler**:
  - It must accept **POST** HTTP requests, with a `CONTENT-TYPE: application/json`.
  - It must look into the `event_type` and dispatch whatever action you need accordingly.
  - It must accept all `event_types`, and ignore those you don't care about.
  - It must respond with a **200 OK** HTTP status. Otherwise we'll assume you didn't get it and will
    try again, with an exponential backoff, for a few days before giving up.
  - It may look for a `WEBHOOK-AUTH` header, which will include a **sha256 hex digest**
    of your API key to make sure it originates from our servers.

To get you started quicker, we've published a
**nodejs based** [web-callbacks handler example server](https://github.com/bitex-la/web-callbacks-handler-example)
on github. The handlers stores all received `Events` in separate files so you
can have a look at what you received in real time.

The [API Reference](https://developers.bitex.la/) includes example events you can
**trigger yourself to mimic our servers**.

[Postman](/docs/postman/postman) users can
just change their
<code>&#123;&#123; webhook_url &#125;&#125;</code>
environment variable to point to your own url, 
and modify the request json bodies to meet your needs.


#### Configuring your **web-callbacks handler**

Once you're done building your **web-callbacks handler** you can configure its URL like this

{% highlight javascript %}

curl --location --request PATCH 'https://sandbox.bitex.la/api/users/me' \
--header 'Content-Type: application/json' \
--header 'Authorization: your_api_key' \
--data-raw '{
    "data": {
        "id": "5",
        "type": "users",
        "attributes": {
            "webhook_url": "https://example.com",
        }
    }
}'
{% endhighlight %}

For added security, you can whitelist our IP addresses or we can setup 
**2 way SSL**.
Contact us at [api@bitex.la](mailto:api@bitex.la) for more information about setting these up.
