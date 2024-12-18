import * as SelectPrimitive from "@radix-ui/react-select";
import { RefObject, forwardRef } from "react";
import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";
import styles from "./select.module.css";

export interface SelectProps {
  items: SelectItemProps[];
  defaultValue?: string;
  defaultOpen?: boolean;
  open?: boolean;
  value: string;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef(function Select(
  { items, defaultValue, defaultOpen, open, value, onValueChange }: SelectProps,
  forwardedRef,
) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      defaultOpen={defaultOpen}
      open={open}
    >
      <SelectPrimitive.Trigger
        ref={forwardedRef as RefObject<HTMLButtonElement>}
        className={`${globals.buttonReset} ${styles.selectTrigger} ${typography.label}`}
      >
        <SelectPrimitive.Value aria-label={value}>
          <div className={styles.selectValue}>
            <img
              src={items.find((item) => item.label === value)?.icon}
              alt=""
              className={styles.icon}
            />
            <span className={typography.label}>
              {items.find((item) => item.label === value)?.label}
            </span>
          </div>
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon asChild>
          <img src="/chevron_down.svg" alt="" className={styles.icon} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectContent items={items} />
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

interface SelectContentProps {
  items: SelectItemProps[];
}

const SelectContent = ({ items }: SelectContentProps) => {
  return (
    <SelectPrimitive.Content
      className={`${globals.root} ${styles.selectContent}`}
    >
      <SelectPrimitive.Viewport className={styles.selectViewport}>
        {items.map((item) => (
          <SelectItem key={item.label} {...item} />
        ))}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  );
};

interface SelectItemProps {
  label: string;
  icon: string;
}

export const SelectItem = forwardRef(function SelectItem(
  { label, icon, ...props }: SelectItemProps,
  forwardedRef,
) {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={forwardedRef as RefObject<HTMLDivElement>}
      value={label}
      className={`${globals.buttonReset} ${styles.selectItem}`}
    >
      <img src={icon} alt="" className={styles.icon} />
      <SelectPrimitive.ItemText asChild>
        <span className={`${styles.itemLabel} ${typography.label}`}>
          {label}
        </span>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <img src="/check.svg" alt="" className={styles.icon} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
