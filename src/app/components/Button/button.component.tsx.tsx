import React from "react";
import clsx from "clsx";

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

const SIZE_CLASSES = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

const COLOR_CLASSES = {
  primary: "bg-[#32C0C6] text-white hover:bg-[#28A4A9]",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

export const Button: React.FC<ButtonProps> = ({
  icon,
  color = "primary",
  size = "medium",
  onClick,
  children,
  disabled = false,
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        " cursor-pointer flex items-center justify-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium text-[14px] leading-[20px] tracking-[0px] transition-all duration-200 w-[145px] h-[80px]",
        COLOR_CLASSES[color],
        SIZE_CLASSES[size],
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
