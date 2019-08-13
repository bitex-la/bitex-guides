These are the possible `Request` states: 

  - `draft`:  Initial state, you can continue modifying it.
  - `quote_requested`:  You have already requested the quote.
  - `quoted`: We already quote.
  - `working`: We are working to make payments.
  - **`finished`**: We have finished paying.
  - **`cancelled`**: You have canceled the `Request`.
