import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider } from "wagmi";
import { BridgeConfig } from "../lib/features/bridge/bridge";
import { ChainProvider } from "../lib/features/ethereum/chainEthereumProvider";
import { initializeAppKit } from "../lib/features/ethereum/wagmiConfig";
import "../lib/theme/theme.css";
import "./globals.css";

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare global {
  interface BigInt {
    toJSON: () => string;
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};
const bridgeConfig: BridgeConfig = {
  style: {
    hasBackgroundImage: true,
  },
  appKitProjectId: "eb014baebd65cd4b4407523fae4cc6d5",
  isMainnet: false,
};

const { appKit, localWagmiAdapter, chainEthereum } =
  initializeAppKit(bridgeConfig);

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <ChainProvider chainEthereum={chainEthereum}>
        <WagmiProvider config={localWagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <div className="root">
              <Story />
            </div>
          </QueryClientProvider>
        </WagmiProvider>
      </ChainProvider>
    ),
  ],
};

export default preview;
