import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";
import { Select, SelectProps } from "../select/select";
import styles from "./valueInput.module.css";

export interface ValueInputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  balanceAmount?: string;
  placeholder?: string;
  valid?: boolean;
  disabled?: boolean;
  inputName?: string;
  select: SelectProps;
}

export const ValueInput = ({
  value,
  onChange,
  balanceAmount,
  placeholder,
  valid = true,
  inputName,
  disabled,
  select,
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

  const activeTicker = select.items.find((item) => item.label === select.value);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tokenRow}>
        <Select {...select} />
        {balanceAmount && (
          <div className={styles.balance}>
            <img
              src="/wallet-money_pay.svg"
              className={styles.walletIcon}
              alt="Balance"
            />
            <span
              className={`${typography.colorSecondary} ${typography.labelSmall}`}
            >
              {balanceAmount}
            </span>
            <span
              className={`${typography.colorSecondary} ${typography.labelSmall}`}
            >
              {activeTicker?.label}
            </span>
          </div>
        )}
      </div>
      <div className={styles.inputRow}>
        <InputField
          id={inputName}
          name={inputName}
          placeholder={placeholder}
          value={value === "0" ? "" : value}
          onChange={onChange}
          disabled={disabled}
          valid={valid || value === "0"}
        />
        <button
          onClick={handleMaxButton}
          className={`${globals.buttonReset} ${styles.maxButton} ${typography.labelSmall}`}
        >
          MAX
        </button>
      </div>
      <span className={`${typography.labelSmall} ${typography.colorSecondary}`}>
        Test
      </span>
    </div>
  );
};

interface InputFieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  valid?: boolean;
}

const InputField = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  valid,
}: InputFieldProps) => {
  const inputClassName = valid || value === "0" ? styles.valid : styles.invalid;

  return (
    <input
      id={id}
      name={name}
      type="text"
      placeholder={placeholder ?? "0.0"}
      value={value === "0" ? "" : value}
      onChange={onChange}
      disabled={disabled}
      autoComplete="off"
      className={`${globals.inputReset} ${styles.inputField} ${inputClassName}`}
    />
  );
};
