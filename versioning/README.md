# Versioning

Bitex takes an approach of **API stability as a deliverable**.

Our endpoints are individually versioned, you can request a specific version
by sending `Version: x.y.z` header.
Each endpoint should provide a list of all its available version numbers.

If no version is specified, the oldest,
most backwards compatible version available will be used.


Some endpoints are marked as experimental,
if you find any of those useful, [drop us a line](mailto:developers@bitex.la)
and we will make them stable.

We will never take an endpoint's version offline without several deprecation
notices to your email, with a 12 month heads up.

<br/>
<hr/>
[Back to Guides index](/)
