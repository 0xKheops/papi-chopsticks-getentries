import { getApi, type ChainId } from "./util/getApi";

const printAssetMetadataCount = async (
  chainId: ChainId,
  withCompatSdk?: boolean
) => {
  const api = await getApi(chainId, withCompatSdk);

  const metadata = await api.query.Assets.Metadata.getEntries();

  console.log(
    "%s%s has %d assets with metadata",
    chainId,
    withCompatSdk ? " (compat)" : "",
    metadata.length
  );

  return metadata;
};

await Promise.all([
  printAssetMetadataCount("realAssetHub"),
  printAssetMetadataCount("chopsticksAssetHub"),
  printAssetMetadataCount("chopsticksAssetHub", true),
]);
