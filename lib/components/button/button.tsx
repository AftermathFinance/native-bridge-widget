import React, { forwardRef } from "react";
import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";
import styles from "./button.module.css";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}
export const Button = forwardRef(function Button(
  { label, onClick, icon, disabled = false, isLoading = false }: ButtonProps,
  ref,
) {
  return (
    <button
      className={`${globals.buttonReset} ${styles.button}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      ref={ref as React.RefObject<HTMLButtonElement>}
    >
      {isLoading && <div className={styles.loader}></div>}
      {icon && icon}
      <span className={typography.label}>{label}</span>
    </button>
  );
});
