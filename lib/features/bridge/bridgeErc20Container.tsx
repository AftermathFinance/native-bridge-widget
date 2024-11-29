import { useDisconnect } from "@reown/appkit/react";
import { ChangeEvent } from "react";
import { useDisconnect as useDisconnectWagmi } from "wagmi";
import {
  BridgeCard,
  BridgeCardProps,
} from "../../components/bridgeCard/bridgeCard";
import { Style } from "../../components/card/card";
import { addressToFriendly, isValidSuiAddress } from "../../utils/address";
import { isValidDecimalString, stringNumberToInput } from "../../utils/string";
import { getBridgeToken, getBridgeTokens } from "../ethereum/getBridgeToken";
import { useBridgeErc20 } from "../ethereum/hooks/useBridgeErc20";
import { useEthereum } from "../ethereum/hooks/useEthereum";
import { BridgeTokenSymbols } from "../ethereum/types";

interface BridgeErc20ContainerProps {
  amountToBridge: string;
  recipient: string;
  style: Style;
  selectedTokenSymbol: BridgeTokenSymbols;
  setAmountToBridge: (amount: string) => void;
  setRecipient: (recipient: string) => void;
  setSelectedTokenSymbol: (token: BridgeTokenSymbols) => void;
}

export const BridgeErc20Container = ({
  amountToBridge,
  recipient,
  style,
  selectedTokenSymbol,
  setAmountToBridge,
  setRecipient,
  setSelectedTokenSymbol,
}: BridgeErc20ContainerProps) => {
  const ethereum = useEthereum();
  const { bridge, tokenBalance, allowance } = useBridgeErc20({
    amountToBridge: isValidDecimalString(amountToBridge) ? amountToBridge : "0",
    recipient,
    selectedTokenSymbol,
  });

  const { disconnect } = useDisconnect();
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();

  const selectedToken = getBridgeToken({
    isMainnet: ethereum.isMainnet,
    tokenSymbol: selectedTokenSymbol,
  });

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    value = stringNumberToInput(value, selectedToken.decimals);

    setAmountToBridge(value);
  };

  const handleUserSetRecipient = (recipient: string) => {
    setRecipient(recipient as `0x${string}`);
  };

  const recipientIsValid = isValidSuiAddress(recipient);
  const inputIsValid =
    bridge.amount.value <= tokenBalance.value &&
    isValidDecimalString(amountToBridge);

  const bridgeItems = getBridgeTokens({ isMainnet: ethereum.isMainnet }).map(
    (token) => ({
      label: token.symbol,
      icon: token.icon,
    }),
  );

  const bridgeCardProps: BridgeCardProps = {
    cardStyle: style,
    valueInput: {
      select: {
        value: bridge.amount.symbol,
        items: bridgeItems,
        onValueChange: (value) =>
          setSelectedTokenSymbol(value as BridgeTokenSymbols),
      },
      balanceAmount: tokenBalance.display,
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
    button:
      !bridge.canWrite && allowance.canWrite
        ? {
            label: "Approve allowance",
            onClick: allowance.handleWrite,
            disabled: !allowance.canWrite || !recipientIsValid,
            isLoading: allowance.isWritePending || allowance.isConfirming,
          }
        : {
            label: "Bridge assets",
            onClick: bridge.handleWrite,
            disabled: !bridge.canWrite || !inputIsValid || !recipientIsValid,
            isLoading:
              bridge.isWritePending ||
              bridge.isConfirming ||
              tokenBalance.isLoading,
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
