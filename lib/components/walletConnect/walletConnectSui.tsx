import typography from "../../theme/typography.module.css";
import { ConnectButton } from "./connectButton";
import { WalletConnectProps } from "./types";
import style from "./walletConnect.module.css";

export const WalletConnectSui = ({
  onClick,
  label = "Connect wallet",
  state = "disconnected",
}: WalletConnectProps) => {
  return (
    <div className={style.walletConnectSui}>
      <span
        className={`${typography.labelSmall} ${typography.colorInvertedSecondary}`}
      >
        To Sui
      </span>
      <ConnectButton
        label={label}
        icon={
          state === "disconnected" ? "/arrow_right--dark.svg" : "/unlink.svg"
        }
        part="sui"
        onClick={onClick}
      />
    </div>
  );
};
