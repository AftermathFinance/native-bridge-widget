import { BridgeChain } from "../../features/ethereum/types";
import typography from "../../theme/typography.module.css";
import { Button, ButtonProps } from "../button/button";
import { Card, Style } from "../card/card";
import { ValueInput, ValueInputProps } from "../input/valueInput";
import { ManualWalletSui } from "../walletConnect/manualWalletSui";
import { ManualWalletProps } from "../walletConnect/types";
import { WalletConnectEth } from "../walletConnect/walletConnectEth";
import styles from "./bridgeCard.module.css";

// TODO: cleanup eth/sui props
export interface BridgeCardProps {
  cardStyle?: Style;
  valueInput: ValueInputProps;
  ethereum: BridgeChain;
  sui: ManualWalletProps;
  button: ButtonProps;
}

export const BridgeCard = ({
  cardStyle,
  valueInput,
  ethereum,
  sui,
  button,
}: BridgeCardProps) => {
  const receiveAmount = "0.0";
  return (
    <Card customStyle={cardStyle}>
      <ValueInput {...valueInput} />

      <div className={styles.walletWrapper}>
        <WalletConnectEth {...ethereum.walletConnect} />
        <ManualWalletSui {...sui} />
      </div>

      <div className={styles.estimateWrapper}>
        <div className={styles.estimateRow}>
          <span
            className={`${typography.labelSmall} ${typography.colorSecondary}`}
          >
            You’ll receive (on Sui)
          </span>
          <span className={`${typography.labelSmall}`}>
            {receiveAmount} {valueInput.select.value}
          </span>
        </div>
      </div>
      <Button {...button} />
    </Card>
  );
};
