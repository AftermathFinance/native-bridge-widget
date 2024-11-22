import { useEffect, useState } from "react";
import { BridgeChain } from "../../features/ethereum/types";
import typography from "../../theme/typography.module.css";
import { Button, ButtonProps } from "../button/button";
import { Card, Style } from "../card/card";
import { ValueInput, ValueInputProps } from "../input/valueInput";
import {
  TransactionCardProps,
  TransactionModal,
} from "../transactionModal/transactionModal";
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
  receive: {
    amount: string;
    symbol: string;
  };
  transaction: TransactionCardProps;
}

export const BridgeCard = ({
  cardStyle,
  valueInput,
  ethereum,
  sui,
  button,
  receive,
  transaction,
}: BridgeCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (transaction.hash) {
      setModalOpen(true);
    }
  }, [transaction.hash]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
            {receive.amount} {receive.symbol}
          </span>
        </div>
      </div>
      <Button {...button} />
      {modalOpen && (
        <TransactionModal {...transaction} onClick={handleModalClose} />
      )}
    </Card>
  );
};
