import React from "react";
import clsx from "clsx";
import { getButtonStyles } from "./button.styles";

interface ButtonProps {
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  color = "primary",
  size = "medium",
  onClick,
  children,
  disabled = false,
  ariaLabel,
  className,
}) => {
  const buttonStyles = getButtonStyles(color, size, disabled);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={clsx(
        "w-[145px] h-[80px] flex items-center justify-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200",
        buttonStyles,
        className
      )}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
