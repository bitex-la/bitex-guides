---
layout: doc
title: "Download and Verify"
section: Audit Bitex
index: 3
---

All `Attestation` report fingerprints are stored as **OP_RETURN** data
of transactions sent by a specific Bitcoin Cash address which is
[qrpc44sqsyykkgsemyc0mq6ua3tjpxhewqevx5flrh](https://www.blockchain.com/bch/address/qrpc44sqsyykkgsemyc0mq6ua3tjpxhewqevx5flrh).

Each transaction sent from 
[qrpc44sqsyykkgsemyc0mq6ua3tjpxhewqevx5flrh](https://www.blockchain.com/bch/address/qrpc44sqsyykkgsemyc0mq6ua3tjpxhewqevx5flrh)
correponds to exactly one `Attestation` in chronological order.

The certain date of an `Attestation` report is the date its transaction was confirmed on the
blockchain. If an `Attestation` report fingerprint is not on-chain, then the `Attestation` is
invalid.

The actual `Attestation` reports can be listed and downloaded through our **API**

{% highlight javascript %}
> curl https://bitex.la/api/notarial_attestations/

{
  "data" : [
    {
      "id" : "227",
      "type" : "notarial_attestations",
      "attributes" : {
        "blockchain" : "BCH",
        "transaction_id" : "68324660f55bc5668d877ca290f833b39148b4d5a96d45b5c33c4133fc171263",
        "content_hash_digest" : "d2be1389eb3cff158114316cdd06207cae455b06539ef963bb7558834ae120a5",
        "updated_at" : "2019-12-20T19:37:13.470Z",
        "created_at" : "2019-12-20T19:17:36.330Z",
        "file_url" : "https://bitex.s3.amazonaws.com/notarial/..."
      },
    },
    ...
  ]
}
{% endhighlight %}

The `file_url` is a link to download the report which is a **jsonlines file**.

Then `content_hash_digest` is a **sha256 hash** on the contents of the file,
you can also calculate that yourself, no need to trust us,

Finally, the `transaction_id` is the Bitcoin Cash transaction where
you can find an **OP_RETURN** containing the `content_hash_digest`.

Following the example above, you can visit [that transaction](https://www.blockchain.com/bch/tx/68324660f55bc5668d877ca290f833b39148b4d5a96d45b5c33c4133fc171263) in a public block explorer, then search for `d2be1389eb3cff158114316cdd06207cae455b06539ef963bb7558834ae120a5`
in that page.

