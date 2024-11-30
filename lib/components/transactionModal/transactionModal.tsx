import { TokenBalance } from "../../features/ethereum/types";
import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";
import { addressToFriendly } from "../../utils/address";
import { OutgoingLink } from "../outgoingLink/outgooingLink";
import styles from "./transactionModal.module.css";

export interface TransactionCardProps {
  hash?: string;
  transactionStatus: "Pending..." | "Completed" | "Failed";
  address?: `0x${string}`;
  recipient: string;
  token: TokenBalance;
  onClick?: () => void;
}

export const TransactionModal = ({
  hash,
  transactionStatus,
  address,
  recipient,
  token,
  onClick,
}: TransactionCardProps) => {
  const scanner = import.meta.env.IS_MAINNET
    ? "https://etherscan.io/tx/"
    : "https://sepolia.etherscan.io/tx/";

  const bridgeHistory = import.meta.env.IS_MAINNET
    ? "https://bridge.sui.io/transactions/"
    : "https://bridge.testnet.sui.io/transactions/";

  return (
    <div className={styles.txWrapper}>
      <button
        className={`${globals.buttonReset} ${styles.closeButton}`}
        onClick={onClick}
      >
        <img src="/x.svg" />
      </button>
      <div className={styles.header}>
        <span className={`${typography.large}`}>
          {token.display} {token.symbol}
        </span>
        <span
          className={`${typography.labelSmall} ${typography.colorSecondary}`}
        >
          From Ethereum to Sui
        </span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={typography.label}>Ethereum</span>
          <img src="/ETH.svg" alt="Ethereum" />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.dataRow}>
            <span
              className={`${typography.labelSmall} ${typography.colorSecondary}`}
            >
              Originating wallet
            </span>
            <span className={typography.body}>
              {address && addressToFriendly(address)}
            </span>
          </div>

          <div className={styles.dataRow}>
            <span
              className={`${typography.labelSmall} ${typography.colorSecondary}`}
            >
              Transaction status
            </span>
            <span className={typography.body}>{transactionStatus}</span>
          </div>
          <div className={styles.dataRow}>
            <span
              className={`${typography.labelSmall} ${typography.colorSecondary}`}
            >
              Transaction hash
            </span>
            <OutgoingLink to={`${scanner}${hash}`}>
              <span className={typography.body}>
                {hash && addressToFriendly(hash)}
              </span>
            </OutgoingLink>
          </div>
        </div>
        <span className={`${typography.label} ${typography.colorSecondary}`}>
          Ethereum may take 10 minutes or more to bridge.
        </span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={typography.label}>Sui</span>
          <img src="/SUI.svg" alt="Sui" />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.dataRow}>
            <span
              className={`${typography.labelSmall} ${typography.colorSecondary}`}
            >
              Recipient wallet
            </span>
            <span className={typography.body}>
              {addressToFriendly(recipient)}
            </span>
          </div>
        </div>
        <OutgoingLink to={`${bridgeHistory}${address}`}>
          <span className={typography.label}>
            View bridge transaction status
          </span>
        </OutgoingLink>
      </div>
    </div>
  );
};
