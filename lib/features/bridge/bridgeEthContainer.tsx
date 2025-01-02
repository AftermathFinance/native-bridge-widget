import { useDisconnect } from "@reown/appkit/react";
import { ChangeEvent } from "react";
import { formatEther } from "viem";
import { useDisconnect as useDisconnectWagmi } from "wagmi";
import {
  BridgeCard,
  BridgeCardProps,
} from "../../components/bridgeCard/bridgeCard";
import { Style } from "../../components/card/card";
import { addressToFriendly, isValidSuiAddress } from "../../utils/address";
import { isValidDecimalString, stringNumberToInput } from "../../utils/string";
import { getBridgeTokens } from "../ethereum/getBridgeToken";
import { useBridgeEth } from "../ethereum/hooks/useBridgeEth";
import { useEthereum } from "../ethereum/hooks/useEthereum";
import { useTokenIds } from "../ethereum/hooks/useTokenIds";

interface BridgeEthContainerProps {
  amountToBridge: string;
  recipient: string;
  style: Style;
  setAmountToBridge: (amount: string) => void;
  setRecipient: (recipient: string) => void;
  setSelectedTokenSymbol: (token: string) => void;
}

export const BridgeEthContainer = ({
  amountToBridge,
  recipient,
  style,
  setAmountToBridge,
  setRecipient,
  setSelectedTokenSymbol,
}: BridgeEthContainerProps) => {
  const ethereum = useEthereum();
  const tokenIds = useTokenIds();
  const { bridge, tokenBalance, fee } = useBridgeEth({
    amountToBridge: isValidDecimalString(amountToBridge) ? amountToBridge : "0",
    recipient,
  });

  const { disconnect } = useDisconnect();
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    value = stringNumberToInput(value, tokenBalance.decimals);

    setAmountToBridge(value);
  };

  const handleUserSetRecipient = (recipient: string) => {
    setRecipient(recipient as `0x${string}`);
  };

  const recipientIsValid = isValidSuiAddress(recipient);
  const inputIsValid =
    bridge.amount.value <= tokenBalance.value &&
    isValidDecimalString(amountToBridge);

  const bridgeItems = getBridgeTokens({
    isMainnet: ethereum.isMainnet,
    tokenIds,
  }).map((token) => ({
    label: token.symbol,
    icon: token.icon,
  }));

  const bridgeCardProps: BridgeCardProps = {
    cardStyle: style,
    valueInput: {
      select: {
        value: bridge.amount.symbol,
        items: bridgeItems,
        onValueChange: (value) => setSelectedTokenSymbol(value),
      },
      balanceAmount: tokenBalance.display,
      maxAmount: formatEther(tokenBalance.value - fee),
      placeholder: "0.0",
      value: bridge.amount.formatted,
      onChange: handleUserInput,
      valid: inputIsValid,
      inputName: "Bridge token amount",
    },
    ethereum: {
      walletConnect: {
        label:
          ethereum.ensName ??
          (ethereum.address
            ? addressToFriendly(ethereum.address)
            : "Connect wallet"),
        state: ethereum.address ? "connected" : "disconnected",
        onClick: () => {
          if (ethereum.address) {
            void disconnect();
            disconnectWagmi();
          } else {
            void ethereum.openConnectModal({ view: "Connect" });
          }
        },
      },
    },
    sui: {
      onChange: (e) => handleUserSetRecipient(e.target.value),
      value: recipient,
      valid: recipientIsValid,
    },
    button: {
      label: "Bridge assets",
      onClick: bridge.handleWrite,
      disabled: !bridge.canWrite || !inputIsValid || !recipientIsValid,
      isLoading:
        bridge.isWritePending || bridge.isConfirming || tokenBalance.isLoading,
    },
    receive: {
      amount: bridge.amount.display,
      symbol: "ETH",
    },
    transaction: {
      hash: bridge.hash,
      transactionStatus: bridge.isConfirmed
        ? "Completed"
        : bridge.isError
          ? "Failed"
          : "Pending...",
      address: ethereum.address,
      recipient,
      token: bridge.amount,
    },
  };

  return <BridgeCard {...bridgeCardProps} />;
};
