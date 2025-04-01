import React, { ReactNode } from "react";
import clsx from "clsx";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <header
      className={clsx(
        "flex items-center justify-between w-full h-[80px] border-b border-[#E3E6E9]",
        className
      )}
      role="banner"
    >
      {children}
    </header>
  );
};
