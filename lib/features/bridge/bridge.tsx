import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Config, WagmiProvider } from "wagmi";
import { hashFn } from "wagmi/query";
import { Style } from "../../components/card/card";
import { localWagmiAdapter } from "../ethereum/wagmiConfig";
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
}

export const Bridge = ({ style, wagmiConfig, queryClient }: BridgeConfig) => {
  const config = wagmiConfig ?? localWagmiAdapter.wagmiConfig;
  const client = queryClient ?? localQueryClient;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <BridgeContainer style={style} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};
