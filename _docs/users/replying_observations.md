---
layout: doc
title: "Replying Observations"
section: User Management
index: 6
---

Our compliance officers may ask for corrections or clarifications on an 
`Issue`. This will lead to a (hopefully) brief back and forth between us and
whoever is addressing those observations. As a `Master User` you can choose
to have an app where your customers themselves reply to observations,
or maybe you want to notify your staff first, and then they can
contact your customer to rectify the situation and forward the data back to us.

The conversation is started by our compliance officers
by adding `Observations` to the `Issue`.
which will change its state to
<span class="badge badge-warning">observed</span>. A list
of `Observations` will be available as one of the `Issue's` __relationships__ and
in full in the __included__ section.

The `User` `compliance_state` will remain the same, in this case <span class="badge badge-dark">new</span>.

All `Observations` have a __note__ attribute with a custom text written by
our compliance team explaining the specific situation that caused this
observation, and an `ObservationReason` wich is a bit more generic.

Relevant `ObservationReasons` are available in the __included__ section, and
include generic text in Spanish, Portuguese and English. They are not constants,
new ones may be added and some may fall out of use. They are assigned at the sole
discression of our compliance officers. While they have a unique id,
it is strongly recommended you don't attempt to base your workflow on specific
`ObservationReasons`. All attributes from the `ObservationReason` are also merged into
the `Observation` for your convenience.

Once you reply to all of the `Observations`, the `Issue` will be reviewed again.

Here's an example of an `Issue` that was observed because the `Attachment` of
the `IdentificationSeed` was illegible.


{% highlight javascript %}
curl "https://sandbox.bitex.la/api/issues/1657" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.0"

Response:

{
  "data": {
    "id": "1657",
    "type": "issues",
    "attributes": {
      "state": "observed",
      "reason_code": "new_client",
      "created_at": "2019-08-30T12:54:18.000Z",
      "updated_at": "2019-09-01T05:51:30.000Z"
    },
    "relationships": {
      "observations": { "data": [{ "id": "341", "type": "observations" }] },
      ...snip...
    }
  },
  "included": [
    { "id": "341",
      "type": "observations",
      "attributes": {
        "note": "Do something",
        "reply": null,
        "state": "new",
        "scope": "client",
        "subject_es": "Identificación ilegible",
        "body_es": "No pudo leerse la identificación. Por favor envie una imágen de mejor calidad.",
        "subject_en": "Illegible id",
        "body_en": "We couldn't read your photo id. Please send a higher quality image.",
        "subject_pt": "Identificação Ilegível",
        "body_pt": "Não foi possível ler o seu ID da foto. Envie uma imagem de qualidade superior."
      },
      "relationships": {
        "observation_reason": {
          "data": { "id": "2", "type": "observation_reasons" }
        }
      }
    },
    { "id": "2",
      "type": "observation_reasons",
      "attributes": {
        "subject_es": "Identificación ilegible",
        "body_es": "No pudo leerse la identificación. Por favor envie una imágen de mejor calidad.",
        "subject_en": "Illegible id",
        "body_en": "We couldn't read your photo id. Please send a higher quality image.",
        "subject_pt": "Identificação Ilegível",
        "body_pt": "Não foi possível ler o seu ID da foto. Envie uma imagem de qualidade superior."
      }
    },
    ...snip...
  ]
}

{% endhighlight %}

A good way to address this `Observation` would be to add a new `Attachment`
to the `IdentificationSeed` with a higher resolution image,
using the same endpoint as earlier. In other cases, you may want to __update__
or __create__ new `Seeds`, depending on what the `Observation` requires.

Once that's done, you need to __reply__ to the `Observation` by updating its
__reply__ text. It can be meaningful text for our compliance officers to read
or it can be placeholder text just to mark the `Observation` as answered.

{% highlight javascript %}
curl --location --request PATCH "https://sandbox.bitex.la/api/observations/341" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
  --header "Version: 2.0"
  --data '{
    "data": {
      "type": "observations",
      "attributes": {
        "reply": "Fixed it, look again."
      }
    }
  }'
{% endhighlight %}

When all `Observations` have been answered the `Issue` state will be 
<span class="badge badge-primary">answered</span> and will be reviewed again.

Check out the [API reference](https://developers.bitex.la/?version=latest#5b26b3f8-7fa9-4f6b-9a7b-4be2ac689b73)
for examples on replying to `Observations` and updating `Seeds`.
