export const getButtonStyles = (
  color: "primary" | "secondary" | "danger",
  size: "small" | "medium" | "large",
  disabled: boolean
): string => {
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

  return [
    SIZE_CLASSES[size],
    COLOR_CLASSES[color],
    disabled && "opacity-50 cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");
};
