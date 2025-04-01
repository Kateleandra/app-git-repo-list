import React from "react";
import clsx from "clsx";
import { typographyStyles } from "./typography.styles";

type TypographyProps = {
  variant: "h1" | "h2" | "h5" | "p";
  children: React.ReactNode;
  className?: string;
  color: "grey" | "primary";
  center?: boolean;
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  color,
  center = false,
}) => {
  const baseStyles = typographyStyles[variant][color];

  return (
    <div
      className={clsx(baseStyles, className, { "text-center": center })}
      aria-label={variant}
    >
      {children}
    </div>
  );
};
