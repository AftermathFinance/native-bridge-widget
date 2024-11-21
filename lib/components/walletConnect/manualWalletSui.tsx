import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";
import { ManualWalletProps } from "./types";
import styles from "./walletConnect.module.css";

export const ManualWalletSui = ({
  onChange,
  value,
  valid = true,
}: ManualWalletProps) => {
  const inputClassName =
    valid || value === "0" ? styles.suiInputValid : styles.suiInputInvalid;

  return (
    <div className={styles.walletConnectSui}>
      <span
        className={`${typography.labelSmall} ${typography.colorInvertedSecondary}`}
      >
        To Sui
      </span>
      <input
        className={`${globals.inputReset} ${styles.suiInput} ${inputClassName}`}
        type="text"
        placeholder="Sui address"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
