---
layout: doc
title: "Transactions"
section: Notarial
index: 3
---

Notarial Transactions are valid **BCH** transactions, so it must follow the same rules as BCH plus new rules added by the _Notarial Protocol_.  

A valid BCH transaction will be considered a valid _Notarial transaction_ if it complies with the following general rules:

1. There is at least one output that complies with the format described above in the _OP_RETURN format_ section below.

The _Notarial Protocol_ always uses the first output found that complies with the format specified in the _OP_RETURN format_ section below.

The other outpus, which may be valid in BCH outputs, will be ignored by Notarial, whether or not they contain an `OP_RETURN` opcode.
