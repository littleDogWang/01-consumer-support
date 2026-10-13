# 02 Consumer support

`orders.json` is the versioned demo order and warranty fixture. `orders.ts`
provides the exact lookup contract, exposed through the read-only
`lookup_order` API. Unknown orders return 404 and the Agent must offer human
follow-up instead of guessing.
