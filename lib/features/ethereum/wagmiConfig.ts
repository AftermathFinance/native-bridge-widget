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

// TODO: add chain logic
export const chainEthereum = false ? mainnet : sepolia;

const chains = [chainEthereum] as const;
const chainIds = chains.map((chain) => chain.id).join(",");
const env = import.meta.env.VITE_ENV as string;
const key = `wagmi-${env}-chains-${chainIds}`;

const WALLET_CONNECT_PROJECT_ID = "eb014baebd65cd4b4407523fae4cc6d5";

export const localWagmiAdapter = new WagmiAdapter({
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
  projectId: WALLET_CONNECT_PROJECT_ID,
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
      http("https://ethereum-sepolia-rpc.publicnode.com"),
      http(),
      http("https://gateway.tenderly.co/public/sepolia"),
    ]),
  },
});

createAppKit({
  adapters: [localWagmiAdapter],
  projectId: WALLET_CONNECT_PROJECT_ID,
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
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#4da2ff",
    "--w3m-color-mix": "#030f1c",
    "--w3m-color-mix-strength": 100,
    "--w3m-font-family": "Inter, Roboto, sans-serif",
    "--w3m-font-size-master": "10px",
    "--w3m-border-radius-master": "2px",
  },
});
