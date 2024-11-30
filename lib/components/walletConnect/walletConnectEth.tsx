import typography from "../../theme/typography.module.css";
import { ConnectButton } from "./connectButton";
import { WalletConnectProps } from "./types";
import style from "./walletConnect.module.css";

export const WalletConnectEth = ({
  onClick,
  label = "Connect wallet",
  state = "disconnected",
}: WalletConnectProps) => {
  return (
    <div className={style.walletConnectEth}>
      <span className={`${typography.labelSmall} ${typography.colorSecondary}`}>
        From Ethereum
      </span>
      <ConnectButton
        label={label}
        icon={state === "disconnected" ? "/arrow_right.svg" : "/unlink.svg"}
        part="eth"
        onClick={onClick}
      />
    </div>
  );
};
