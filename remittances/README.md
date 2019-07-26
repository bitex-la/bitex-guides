
# Remittances

Remittance workflows with bitcoin usually require exchanges to take either one of two roles:

1) Turning fiat into bitcoin at the sender's request and then forwarding the produced bitcoin to another exchange which will... 2) Sell the bitcoin for fiat and then process a withdrawal on the receiving party's behalf.

Bitex can take any of those roles, provided the sender or receiver has an account and an accepted KYC Profile in Bitex.

Our [Reseller API](https://bitex.la/developers#resellers) lets you create new accounts in Bitex and you can then use the [Compliance](https://developers.bitex.la/?version=latest#ebab700c-cb60-4954-907a-9dd1f067d6ed) endpoints to produce a valid profile.

For sending a remmittance your can instruct the person to [deposit cash](https://developers.bitex.la/?version=latest#7345f816-e2db-4a29-b9d2-8c9d8e432a82) into their Bitex balance using one of the supported mechanisms, [Buy Bitcoin](https://developers.bitex.la/?version=latest#5485d842-a27f-4871-8fce-5b5a225caf96) in an orderbook and then [Withdraw](https://developers.bitex.la/?version=latest#34d649b4-9fff-4ad8-97ea-bfd469e519dd) Bitcoin to the desired bitcoin address.

For receiving a remmitance you can use our [Asset Wallet API](https://developers.bitex.la/?version=latest#abea0469-f651-460b-ba60-352fa673783b) to get a fresh bitcoin address to receive the money to and automatically convert it from BTC to USD at the best market price in Bitex, then request a [USD Withdrawal](https://developers.bitex.la/?version=latest#884c4e07-faa6-4471-9d88-5f913c721b88) to their bank account, or whatever other withdrawal method is supported by Bitex in the customer's country.

<div class="footer-nav">
  <span>
    Back:
    <a href="/">Guides index</a>
  </span>
</div>