import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";
import styles from "./valueInput.module.css";

export interface ValueInputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  amountLabel?: string;
  balanceAmount?: string;
  balanceAmountLabel?: string;
  // tokens?: DropdownItemProps[];
  tokensDropdownLabel?: string;
  activeToken?: number;
  placeholder?: string;
  valid?: boolean;
  disabled?: boolean;
  inputName?: string;
}

export const ValueInput = ({
  value,
  onChange,
  amountLabel,
  balanceAmount,
  balanceAmountLabel,
  // tokens,
  tokensDropdownLabel = "Select a token",
  activeToken,
  placeholder,
  valid = true,
  inputName,
  disabled,
}: ValueInputProps) => {
  const handleMaxButton = () => {
    if (balanceAmount) {
      onChange &&
        onChange({
          target: {
            value: balanceAmount,
          },
        } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tokenRow}>
        <span>Test</span>
        <button
          onClick={handleMaxButton}
          className={`${globals.buttonReset} ${styles.maxButton} ${typography.labelSmall}`}
        >
          MAX
        </button>
      </div>
    </div>
  );
};
