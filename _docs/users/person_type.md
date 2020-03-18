---
layout: doc
title: Person Type
section: User Management
index: 3
---

Bitex `User`'s may be **Natural Persons** (humans) or **Legal Entities** (companies).

You decide which type of **Person** you're setting up by adding either a
`NaturalDocketSeed` or `LegalEntityDocketSeed` in their first `Issue`.

Once decided, the `User` type cannot be changed.

All fields are optional in the API, but you must adhere to the compliance program
agreed with Bitex. Otherwise, our compliance team will request changes and amends before
accepting the person as a customer.

See all the fields in the
[API reference](https://developers.bitex.la/?version=latest#6bab2045-7754-43a3-ba99-d3d54ded0c62)

### Natural Persons

For a **Natural Person** you create a `NaturalDocketSeed` related to the `Issue`
and set attributes like
their name, nationality, date of birth, marital status, whether they are a
[politically exposed person](https://en.wikipedia.org/wiki/Politically_exposed_person).

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/natural_docket_seeds" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
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

### Legal Entities

For a **Legal Entity** you create a `LegalEntityDocketSeed` related to the
`Issue` and set attributes like
the company name, country of incorporation, business description.

{% highlight javascript %}

curl --location --request POST "https://sandbox.bitex.la/api/legal_entity_docket_seeds" \
  --header "Content-Type: application/json" \
  --header "Authorization: your_api_key" \
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

