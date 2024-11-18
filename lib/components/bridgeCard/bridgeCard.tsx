import { BridgeChain } from "../../features/ethereum/types";
import typography from "../../theme/typography.module.css";
import { Button, ButtonProps } from "../button/button";
import { Card, Style } from "../card/card";
import { ValueInput, ValueInputProps } from "../input/valueInput";
import { WalletConnectEth } from "../walletConnect/walletConnectEth";
import { WalletConnectSui } from "../walletConnect/walletConnectSui";
import styles from "./bridgeCard.module.css";

export interface BridgeCardProps {
  cardStyle?: Style;
  valueInput: ValueInputProps;
  ethereum: BridgeChain;
  sui: BridgeChain;
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
        <WalletConnectSui {...sui.walletConnect} />
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
