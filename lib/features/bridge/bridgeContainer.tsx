import { useDeferredValue, useState } from "react";
import { Style } from "../../components/card/card";
import { BridgeTokenSymbols } from "../ethereum/types";
import { BridgeErc20Container } from "./bridgeErc20Container";
import { BridgeEthContainer } from "./bridgeEthContainer";

interface BridgeContainerProps {
  style: Style;
}

export const BridgeContainer = ({ style }: BridgeContainerProps) => {
  const [amountToBridge, setAmountToBridge] = useState<string>("");
  const deferredAmountToBridge = useDeferredValue(amountToBridge);

  const [selectedTokenSymbol, setSelectedTokenSymbol] =
    useState<BridgeTokenSymbols>("ETH");
  const [recipient, setRecipient] = useState<string>("");

  if (selectedTokenSymbol === "ETH") {
    return (
      <BridgeEthContainer
        amountToBridge={deferredAmountToBridge}
        recipient={recipient}
        style={style}
        setAmountToBridge={setAmountToBridge}
        setRecipient={setRecipient}
        setSelectedTokenSymbol={setSelectedTokenSymbol}
      />
    );
  }

  return (
    <BridgeErc20Container
      amountToBridge={deferredAmountToBridge}
      recipient={recipient}
      style={style}
      selectedTokenSymbol={selectedTokenSymbol}
      setAmountToBridge={setAmountToBridge}
      setRecipient={setRecipient}
      setSelectedTokenSymbol={setSelectedTokenSymbol}
    />
  );
};
