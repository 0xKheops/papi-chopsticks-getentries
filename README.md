# papi-chopsticks-getentries

This repo highlights an issue with chopsticks 0.16.1 and polkadot-api 1.5.1
On a chopsticks RPC, the api.query.Assets.Metadata.getEntries() method only returns the first 100 entries

Run chopsticks :

```bash
npx @acala-network/chopsticks@latest xcm -r polkadot -p statemint -p hydradx
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```
