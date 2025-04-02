"use client";

import React, { useCallback } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/presentation/components/Button/button.component.tsx";
import { Header } from "@/app/presentation/components/Header/header.component";
import { InputSearch } from "@/app/presentation/components/InputSearch/input-search.component";

interface SearchHeaderProps {
  onSearch: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  searchedUsername: string;
  errorCode: number | null;
}

export function SearchHeader({ onSearch, setUsername }: SearchHeaderProps) {
  const handleSearch = useCallback(() => {
    onSearch();
  }, [onSearch]);

  return (
    <Header>
      <InputSearch onSearch={handleSearch} setUsername={setUsername} />
      <Button aria-label="Ver favoritos">
        <HeartIcon className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">Favoritos</span>
      </Button>
    </Header>
  );
}

export function SearchHeaderFactory(props: SearchHeaderProps) {
  return <SearchHeader {...props} />;
}
