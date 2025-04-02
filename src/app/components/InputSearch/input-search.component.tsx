"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type InputSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  setUsername?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  onClear?: () => void;
};

export function InputSearch({
  value,
  onChange,
  onSearch,
  setUsername,
  className,
  onClear,
}: InputSearchProps) {
  return (
    <div
      className={clsx(
        "relative w-full max-w-[668px] h-[40px] ml-4 sm:ml-[24px]",
        className
      )}
      role="search"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setUsername?.(e.target.value);
        }}
        placeholder="Buscar usuário"
        className="w-full h-full px-4 border text-[#8c8c8c] border-[#e3e6e9] rounded bg-white outline-none transition duration-200 focus:border-[#3b82f6] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.5)]"
        aria-label="Campo para buscar usuário"
      />
      <button
        type="button"
        onClick={() => {
          onSearch?.();
        }}
        className="cursor-pointer absolute top-2 right-2 text-[#8C8C8C] hover:text-[#3b82f6] focus:outline-none"
        aria-label="Buscar dados"
      >
        <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}
