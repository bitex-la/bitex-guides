---
layout: doc
title: Contact Compliance
section: User Management
index: 2
---

To make a `User` account actually usable, it needs to be reviewed and approved
by our compliance team. That means, the `User`'s `compliance_state` attribute
should be <span class="badge badge-success">enabled</span>.
Head to the [user states summary section](/docs/users/states_summary)
for the other possible `complaince_state` values.

You can request an account to be reviewed by drafting an `Issue`,
providing all the associated customer data and then marking it as
<span class="badge badge-primary">new</span> which means it's ready be reviewed.

Your issue will then be <span class="badge badge-warning">observed</span>, <span class="badge
badge-success">approved</span> or <span class="badge badge-danger">rejected</span> by our compliance
team.

You create an issue like this. Notice the 'user' relationship should point to them.

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/issues" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.0"
  --data '{
    "data": {
      "type": "issues",
      "attributes": {
        "reason_code": "new_client"
      },
      "relationships": {
        "issue": {
          "data": { 
            "type": "users",
            "id": 2
          }
        }
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
different types of resources associated to an `Issue`,
`NaturalDocketSeed`, `LegalEntityDocketSeed`, `DomicileSeed`,
and `IdentificationSeed`.

An `Issue` has many `Seeds`, each one stands as a proposal for adding
some data like a `User's` domicile and proof of address,
`IdentificationSeed` for identity, and so on.

<div class="alert alert-warning">
Keep in mind the required seeds
and fields may vary depending on the compliance program Bitex has set up for you,
the compliance program is not enforced in the API, so it's up to you to comply
to get your `Users`'s approved.
</div>

Next we will create some of the common `Seeds`.

Check out the [API reference](https://developers.bitex.la/?version=latest#5b26b3f8-7fa9-4f6b-9a7b-4be2ac689b73)
for examples on how to create other types of seeds.

