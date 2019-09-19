---
layout: doc
title: Contact Compliance
section: User Management
index: 3
---

To make a `User` account actually usable, it needs to be reviewed and approved
by our compliance team.

You can request a customer account to be reviewed by drafting an `Issue`,
providing all the associated customer data and then marking it as
<span class="badge badge-primary">new</span> which means it's ready be reviewed.

Your issue will then be <span class="badge badge-warning">observed</span>, <span class="badge
badge-success">approved</span> or <span class="badge badge-danger">rejected</span> by our compliance
team.

You create an issue like this. Notice the `User` id in the __Authorization__ header:

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/issues" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=692" \
  --header "Version: 2.0"
  --data '{
    "data": {
      "type": "issues",
      "attributes": {
        "reason_code": "new_client"
      }
    }
  }'

Response:

{ "data": {
    "id": "1657",
    "type": "issues",
    "attributes": {
      "state": "draft",
      "reason_code": "new_client",
      "created_at": "2019-08-30T12:54:18.000Z",
      "updated_at": "2019-08-30T12:54:18.000Z"
    },
    "relationships": {
      "person": {
        "data": {
          "id": "203453",
          "type": "people"
        }
      },
      "natural_docket_seed": { "data": null },
      "legal_entity_docket_seed": { "data": null },
      "identification_seeds": { "data": [] },
      "domicile_seeds": { "data": [] },
      ...snip...
    }
  },
  "included": [{
    "id": "203453",
    "type": "people",
    "attributes": {
      "enabled": false,
      "person_type": null,
      "created_at": "2019-08-30T10:36:54.000Z",
      "updated_at": "2019-08-30T10:36:54.000Z"
    },
    "relationships": {
      ...snip...
    }
  },
  ...snip...
  ]
}

{% endhighlight %}

Notice your `Issue` starts out in the <span class="badge badge-dark">draft</span> state.

The response above already hints that there may be
different types of resources associated to an `Issue`, like `Person`,
`NaturalDocketSeed`, `LegalEntityDocketSeed`, `DomicileSeed`,
and `IdentificationSeed`.

The `Person` contains all your `User's` personal information, collected from
all that `Person's` approved `Issues` and curated by
our compliance officers.  You'll never need to use a `Person` directly though,
you will always propose changes through an `Issue`.

An `Issue` also has many `Seeds`, each one stands as a proposal for adding
some data like a `Person's` domicile and proof of address,
`IdentificationSeed` for identity, and so on.

<div class="alert alert-warning">
Keep in mind the required seeds
and fields may vary depending on the compliance program Bitex has set up for you,
the compliance program is not enforced in the API, so it's up to you to comply
to get your user's approved.
</div>

Next we will create some of the common `Seeds`.

Check out the [API reference](https://developers.bitex.la/?version=latest#0152581e-7b56-459a-a815-b755cd889d46)
for examples on how to create other types of seeds.
