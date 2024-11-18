import {
  BridgeCard,
  BridgeCardProps,
} from "../../components/bridgeCard/bridgeCard";
import { Style } from "../../components/card/card";
import { addressToFriendly } from "../../utils/address";
import { useEthereum } from "../ethereum/useEthereum";

interface BridgeContainerProps {
  style: Style;
}

export const BridgeContainer = ({ style }: BridgeContainerProps) => {
  const ethereum = useEthereum();

  const bridgeCardProps: BridgeCardProps = {
    cardStyle: style,
    valueInput: {
      select: {
        value: "ETH",
        items: [
          { label: "ETH", icon: "/ETH.svg" },
          { label: "wBTC", icon: "/wBTC.svg" },
        ],
      },
      balanceAmount: "0.0",
      placeholder: "0.0",
    },
    ethereum: {
      walletConnect: {
        label: ethereum.address
          ? addressToFriendly(ethereum.address)
          : "Connect wallet",
        state: ethereum.address ? "connected" : "disconnected",
        onClick: ethereum.openConnectModal,
      },
    },
    sui: {
      walletConnect: {
        label: "Connect wallet",
        state: "disconnected",
        onClick: () => console.log("Connect wallet"),
      },
    },
    button: {
      label: "Bridge assets",
      onClick: () => console.log("Bridge"),
    },
  };

  return <BridgeCard {...bridgeCardProps} />;
};
