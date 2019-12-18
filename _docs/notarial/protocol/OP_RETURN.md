---
layout: doc
title: "OP_RETURN format"
section: Notarial
index: 4
---

The Notarial `OP_RETURN` format follows the [Lokad 4-byte prefix guideline for OP_RETURN on Bitcoin Cash](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/op_return-prefix-guideline.md)

The OP_RETURN format is defined in the following way:

![Transportation Protocol](/assets/images/transportation_protocol.svg)

- The first 7 bytes are fixed and always the same. hex: `6a041ae8170b20`.
- The next 32 bytes represent the _data_ part, ... TODO??
