---
layout: doc
title: Compliance Officer Review
section: User Management
index: 6
---

Once your `User's` `Issue` has all the required `Seeds` and `Attachments` created,
it's time to submit it for review.

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/issues/1657/complete" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=692" \
  --header "Version: 2.0"

Response:

{ "data": {
		"id": "1657",
		"type": "issues",
		"attributes": {
			"state": "new"
		}
	}
}

{% endhighlight %}

The issue state will now change to <span class="badge badge-primary">new</span>
which means it's ready be reviewed.

It may take our compliance officers up to one working day to do so.

You can now start fetching the `Issue` and checking its state attribute.

{% highlight javascript %}
curl "https://sandbox.bitex.la/api/issues/1657" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=692" \
  --header "Version: 2.0"

Response:

{ "data": {
		"id": "1657",
		"type": "issues",
		"attributes": {
			"state": "new",
      "reason": "new_client",
      ...snip...
		}
	},
  ...snip...
}

{% endhighlight %}

#### The `Issue` state is <span class="badge badge-success">approved</span>

If the `Person's` first `Issue` is
<span class="badge badge-success">approved</span>,
then this new `Person` will be 
<span class="badge badge-success">enabled</span> and ready use.

#### The `Issue` state is <span class="badge badge-danger">rejected</span>

If the `Person's` first issue is rejected it means
it is impossible for us to open an account for them.
At that point your compliance team and ours should review the case.  
The `Person` may be in a <span class="badge badge-warning">disabled</span>
or <span class="badge badge-danger">rejected</span> state as a result.

#### The `Issue` state is <span class="badge badge-warning">observed</span>

In some cases, our compliance officers may ask for corrections or
clarifications on the provided data. These changes __can be done via API__.

Move on to the next section to learn more about `Observations`.
