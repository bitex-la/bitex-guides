---
layout: doc
title: Person Type
section: User Management
index: 4
---

Bitex `Person's` may be __Natural Persons__ (humans) or __Legal Entities__ (companies).

You decide which type of `Person` you're setting up by adding either a
`NaturalDocketSeed` or `LegalEntityDocketSeed` in their first `Issue`.

Once decided, the `Person's` type cannot be changed.

<div class="alert alert-warning">
All fields are optional in the API, but you must adhere to the compliance program
agreed with Bitex. Otherwise, our compliance team will request changes and amends before
accepting the person as a customer.
</div>

### Natural Persons

For a __Natural Person__ you create a `NaturalDocketSeed` related to the `Issue`
and set attributes like
their name, nationality, date of birth, marital status, whether they are a
[politically exposed person](https://en.wikipedia.org/wiki/Politically_exposed_person).

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/natural_docket_seeds" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=692" \
  --header "Version: 2.0" \
  --data '{
    "data": {
      "type":"natural_docket_seeds",
      "attributes": {
        "first_name":"John",
        "last_name":"Doe",
        "nationality":"AR",
        "gender_code":"male",
        "marital_status_code":"single",
        "politically_exposed":"false",
        "birth_date":"1990-12-31"
      },
      "relationships": {
        "issue": { "data": {"type": "issues", "id": "1657" } }
      }
    }
  }'

Response:

{
  "data": {
    "id": "1530",
    "type": "natural_docket_seeds",
    "attributes": {
      "first_name": "John",
      "last_name": "Doe",
      "nationality": "AR",
      "gender_code": "male",
      "marital_status_code": "single",
      "job_title": null,
      "job_description": null,
      "politically_exposed": false,
      "politically_exposed_reason": null,
      "birth_date": "1990-12-31",
      "created_at": "2019-08-30T14:50:12.000Z",
      "updated_at": "2019-08-30T14:50:12.000Z"
    },
    "relationships": {
      "issue": { "data": { "id": "1657", "type": "issues" } },
      "attachments": { "data": [] }
    }
  }
}

{% endhighlight %}

The `NaturalDocketSeed` will be created and associated to your current `Issue`.

See all the fields in the [Natural Docket API
reference](https://developers.bitex.la/?version=latest#8096ce68-170d-4f2a-93fd-797439ac6973)

### Legal Entities

For a __Legal Entity__ you create a `LegalEntityDocketSeed` related to the
`Issue` and set attributes like
the company name, country of incorporation, business description.

{% highlight javascript %}

curl --location --request POST "https://sandbox.bitex.la/api/legal_entity_docket_seeds" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=692" \
  --header "Version: 2.0" \
  --data '{
    "data": {
      "type": "legal_entity_docket_seeds",
      "attributes": {
        "industry": "it",
        "business_description": "software",
        "country":"AR",
        "commercial_name": "AwesomeCompany",
        "legal_name": "My Company Inc."
      },
      "relationships": {
        "issue": { "data": {"type": "issues", "id": "1657" } }
      }
    }
  }'

Response:

{
  "data": {
    "id": "3",
    "type": "legal_entity_docket_seeds",
    "attributes": {
      "industry": "it",
      "business_description": "software",
      "country": "AR",
      "commercial_name": "AwesomeCompany",
      "legal_name": "A.Company Inc.",
      "created_at": "2019-04-24T13:13:39.000Z",
      "updated_at": "2019-04-24T13:13:39.000Z"
    },
    "relationships": {
      "issue": { "data": {"type": "issues", "id": "1657" } },
      "attachments": { "data": [] }
    }
  }
}

{% endhighlight %}

See all the fields in the [Legal Entity Docket API
reference](https://developers.bitex.la/?version=latest#973813cb-96ff-454b-8c7c-8c257affdadc)

