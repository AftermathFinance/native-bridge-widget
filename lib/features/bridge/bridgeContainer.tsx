import { useDisconnect } from "@reown/appkit/react";
import { ChangeEvent, useDeferredValue, useState } from "react";
import { useDisconnect as useDisconnectWagmi } from "wagmi";
import {
  BridgeCard,
  BridgeCardProps,
} from "../../components/bridgeCard/bridgeCard";
import { Style } from "../../components/card/card";
import { addressToFriendly } from "../../utils/address";
import { stringNumberToInput } from "../../utils/string";
import { getBridgeToken, getBridgeTokens } from "../ethereum/getBridgeToken";
import { useBridgeErc20 } from "../ethereum/hooks/useBridgeErc20";
import { useEthereum } from "../ethereum/hooks/useEthereum";
import { BridgeTokenSymbols } from "../ethereum/types";

interface BridgeContainerProps {
  style: Style;
}

export const BridgeContainer = ({ style }: BridgeContainerProps) => {
  const [amountToBridge, setAmountToBridge] = useState<string>("");
  const deferredAmountToBridge = useDeferredValue(amountToBridge);

  const [selectedTokenSymbol, setSelectedTokenSymbol] =
    useState<BridgeTokenSymbols>("wETH");

  const [recipient, setRecipient] = useState<string>("");

  const ethereum = useEthereum();
  const { bridge, tokenBalance } = useBridgeErc20({
    amountToBridge: deferredAmountToBridge,
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

  const handleUserSelect = (token: BridgeTokenSymbols) => {
    setSelectedTokenSymbol(token);
  };

  const handleUserSetRecipient = (recipient: string) => {
    setRecipient(recipient as `0x${string}`);
  };

  // it needs to be type `0x${string}`
  const recipientIsValid = /^0x[a-fA-F0-9]{62}$/.test(recipient);

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
        onValueChange: (value) => handleUserSelect(value as BridgeTokenSymbols),
      },
      balanceAmount: tokenBalance.display,
      placeholder: "0.0",
      value: bridge.amount.formatted,
      onChange: handleUserInput,
      valid: bridge.amount.value <= tokenBalance.value,
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
      onClick: () => console.log("Bridge"),
      disabled: !bridge.canWrite,
    },
  };

  return <BridgeCard {...bridgeCardProps} />;
};
