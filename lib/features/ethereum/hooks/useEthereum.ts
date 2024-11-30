import { useAppKit } from "@reown/appkit/react";
import { useEffect } from "react";
import { useAccount, useEnsName } from "wagmi";
import { useChainEthereum } from "./useChainEthereum";

export const useEthereum = () => {
  const chainEthereum = useChainEthereum();
  const { open: openConnectModal } = useAppKit();
  const { address, isConnected, chainId } = useAccount();
  const { data: ensName } = useEnsName({
    address: address,
  });

  const isCorrectChain = chainId === chainEthereum.id && isConnected;
  const isMainnet = chainId === 1;

  useEffect(() => {
    if (address) {
      console.log(
        `You have connected to the Ethereum network with address ${address} and chain ID ${chainId}.`,
      );
    }
  }, [address, chainId]);

  return {
    openConnectModal,
    address,
    ensName,
    isConnected,
    isCorrectChain,
    isMainnet,
  };
};
