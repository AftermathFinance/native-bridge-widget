import React, { forwardRef } from "react";
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
      className={styles.button}
      onClick={onClick}
      disabled={disabled || isLoading}
      ref={ref as React.RefObject<HTMLButtonElement>}
    >
      {isLoading && <></>}
      {icon && icon}
      <span className={styles.label}>{label}</span>
    </button>
  );
});
