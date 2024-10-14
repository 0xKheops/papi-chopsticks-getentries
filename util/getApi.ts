import { realAssetHub, chopsticksAssetHub } from "@polkadot-api/descriptors";
import { type TypedApi, createClient } from "polkadot-api";
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat";
import { getWsProvider } from "polkadot-api/ws-provider/node";
import papiConfig from "../.papi/polkadot-api.json";

export const DESCRIPTORS = {
  realAssetHub,
  chopsticksAssetHub,
} as const;

type Descriptors = typeof DESCRIPTORS;

export type ChainId = keyof Descriptors;

export type Api<Id extends ChainId> = TypedApi<Descriptors[Id]>;

const getProvider = async (chainId: ChainId) => {
  const wsUrl = papiConfig.entries[chainId]?.wsUrl as string;
  if (!wsUrl) throw new Error(`wsUrl not found for chainId: ${chainId}`);
  return getWsProvider(wsUrl);
};

export const getApi = async <Id extends keyof typeof DESCRIPTORS>(
  chainId: Id,
  withCompatSdk?: boolean
): Promise<Api<Id>> => {
  const provider = await getProvider(chainId);
  const client = createClient(
    withCompatSdk ? withPolkadotSdkCompat(provider) : provider
  );

  return client.getTypedApi(DESCRIPTORS[chainId]);
};
