import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { Config, WagmiProvider } from "wagmi";
import { hashFn } from "wagmi/query";
import { Style } from "../../components/card/card";
import { ChainProvider } from "../ethereum/chainEthereumProvider";
import { initializeAppKit } from "../ethereum/wagmiConfig";
import { BridgeContainer } from "./bridgeContainer";

const localQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // globally default to 20 seconds
      staleTime: 1000 * 20,
      queryKeyHashFn: hashFn,
    },
  },
});

export interface BridgeConfig {
  style: Style;
  wagmiConfig?: Config;
  queryClient?: QueryClient;
  appKitProjectId: string;
  isMainnet: boolean;
}

export const Bridge = (bridgeConfig: BridgeConfig) => {
  const client = useMemo(
    () => bridgeConfig.queryClient ?? localQueryClient,
    [bridgeConfig.queryClient],
  );

  const { wagmiConfig, chainEthereum } = useMemo(() => {
    // Initialize AppKit and WagmiAdapter using the dynamic bridgeConfig
    const { appKit, localWagmiAdapter, chainEthereum } =
      initializeAppKit(bridgeConfig);

    return {
      appKit,
      wagmiConfig: bridgeConfig.wagmiConfig ?? localWagmiAdapter.wagmiConfig,
      chainEthereum,
    };
  }, [bridgeConfig]);

  return (
    <ChainProvider chainEthereum={chainEthereum}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={client}>
          <BridgeContainer style={bridgeConfig.style} />
        </QueryClientProvider>
      </WagmiProvider>
    </ChainProvider>
  );
};
