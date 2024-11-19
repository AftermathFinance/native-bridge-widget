import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import { useAccount, useEnsName } from "wagmi";
import { chainEthereum } from "./wagmiConfig";

export const useEthereum = () => {
  const { open: openConnectModal } = useAppKit();
  const { address, isConnected, chainId } = useAccount();
  const { data: ensName } = useEnsName({
    address: address,
  });
  const { walletInfo } = useWalletInfo();

  console.log({ ensName, walletInfo });

  const isCorrectChain = chainId === chainEthereum.id && isConnected;

  return { openConnectModal, address, ensName, isConnected, isCorrectChain };
};
