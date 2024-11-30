import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit/react";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import {
  createStorage,
  deserialize,
  fallback,
  noopStorage,
  serialize,
} from "wagmi";
import { BridgeConfig } from "../bridge/bridge";

export function initializeAppKit(config: BridgeConfig) {
  const { appKitProjectId, isMainnet } = config;
  const chainEthereum = isMainnet ? mainnet : sepolia;

  const chains = [mainnet, sepolia] as const;
  const chainIds = chains.map((chain) => chain.id).join(",");
  const env = import.meta.env.VITE_ENV as string;
  const key = `wagmi-${env}-chains-${chainIds}`;

  const localWagmiAdapter = new WagmiAdapter({
    storage: createStorage({
      deserialize,
      serialize,
      key,
      storage:
        typeof window !== "undefined" && window.localStorage
          ? window.localStorage
          : noopStorage,
    }),
    networks: [chainEthereum],
    projectId: appKitProjectId,
    transports: {
      [mainnet.id]: fallback([
        http("https://ethereum.publicnode.com"),
        http("https://rpc.ankr.com/eth"),
        http("https://eth-mainnet.public.blastapi.iom"),
        http("https://rpc.flashbots.net"),
        http("https://eth.merkle.io"),
        http(),
      ]),

      [sepolia.id]: fallback([
        http("https://eth-sepolia.public.blastapi.io"),
        http("https://sepolia.drpc.org"),
        http("https://endpoints.omniatech.io/v1/eth/sepolia/public"),
        http("https://ethereum-sepolia-rpc.publicnode.com"),
        http("https://gateway.tenderly.co/public/sepolia"),
        http(),
      ]),
    },
  });

  const appKit = createAppKit({
    adapters: [localWagmiAdapter],
    projectId: appKitProjectId,
    networks: [chainEthereum],
    features: {
      analytics: false,
      email: false,
      emailShowWallets: false,
      socials: [],
      swaps: false,
      onramp: false,
    },
    allowUnsupportedChain: false,
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#4da2ff",
      "--w3m-color-mix": "#4da2ff",
      "--w3m-color-mix-strength": 20,
      "--w3m-font-family": "Inter, Roboto, sans-serif",
      "--w3m-font-size-master": "10px",
      "--w3m-border-radius-master": "2px",
    },
  });

  return { appKit, localWagmiAdapter, chainEthereum };
}
