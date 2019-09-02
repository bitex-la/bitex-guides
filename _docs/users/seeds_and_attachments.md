---
layout: doc
title: Seeds and Attachments
section: User Management
index: 5
---

You can then continue completing a `Person's` initial issue by submitting other `Seeds`,
according to the compliance program you've agreed to.

All `Seeds` may also have `Attachments` which contain base64 encoded files pertaining
to the information provided.

##### `IdentificationSeed`
Any document issued by a soverign state that can be used as a __proof of identity__.
For a __natural person__ this may be a national id or passport.
For a __legal entity__ it could be the company bylaws, registration certificates, tax id.
The `Attachment` may be a scan of the actual document.

##### `DomicileSeed`
The `Person's` domicile, with a __proof of residence__ as the `Attachment`.
Usually a scan of a utility bill, but other documents produced by a well known third party may
be accepted too.

##### `AllowanceSeed`
Some compliance programs include a __source of income__ check, while the 
`AllowanceSeed` only has a currency attribute, the important part is the
related `Attachment` which could be payment slips, tax return forms, or any
document that serves as proof of legitimate income.

##### `NoteSeed`
These can be used to include arbitrary text and attachments in a `Person's`
`Issue` with any clarifications you may find relevant.

Some compliance programs may require you to send arbitrary data which cannot be
stored in other `Seed` types, you will use `NoteSeeds` for those.

##### `EmailSeed` and `PhoneSeed`
The `Person's` email addresses and phone numbers. No attachments needed.

##### `ArgentinianInvoicingDetailSeed` and `ChileanInvoicingDetailSeed`

For customers __living in Argentina or Chile__ who will be depositing or withdrawing
funds, we need to have their domestic invoicing details so that we can produce
a domestic legal receipt for any fees we charge.

### Here's an example

Creating an `IdentificationSeed` and one `Attachment` for it.

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/identification_seeds" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=692" \
  --header "Version: 2.0" \
  --data '{
    "data": {
      "type":"identification_seeds",
      "attributes": {
        "identification_kind_code": "national_id",
        "issuer": "AR",
        "number": "12345678"
      },
      "relationships": {
        "issue": { "data": {"type": "issues", "id": "1657" } }
      }
    }
  }'

Response:

{ "data": {
    "id": "2765",
    "type": "identification_seeds",
    "attributes": {
      "identification_kind_code": "national_id",
      "number": "12345678",
      "issuer": "AR",
      "public_registry_authority": null,
      "public_registry_book": null,
      "public_registry_extra_data": null,
      "created_at": "2019-08-30T16:31:18.000Z",
      "updated_at": "2019-08-30T16:31:18.000Z"
    },
    "relationships": {
      "issue": { "data": { "id": "1657", "type": "issues" } },
      "attachments": { "data": [] }
    }
  }
}
{% endhighlight %}

And now the `Attachment`, with a base64 encoded payload. The payload provided in this
example is a single transparent pixel png. Your images will be much larger.

Notice also how this `Attachment` is related to the `IdentificationSeed` 
created before.

{% highlight javascript %}
curl --location --request POST "https://sandbox.bitex.la/api/attachments" \
  --header "Content-Type: application/json" \
  --header "Authorization: master_user_api_key; user=692" \
  --header "Version: 2.0" \
  --data '{
    "data": {
      "type": "attachments",
      "attributes": {
        "document": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==",
        "document_file_name": "pixel.png",
        "document_content_type": "image/png",
        "document_size": "68"
      },
      "relationships": {
        "attached_to_seed": {
          "data": { "id": "2765", "type": "identification_seeds" }
        }
      }
    }
  }'
{% endhighlight %}

Other seed types are created in the same way, and they all support attachments.
See the [Compliance API reference](https://developers.bitex.la/?version=latest#0152581e-7b56-459a-a815-b755cd889d46)
for more examples.

Moving on, we will submit the `Issue` for compliance approval and wait for their response.

