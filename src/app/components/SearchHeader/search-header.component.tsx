"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/components/Button/button.component.tsx";
import { Header } from "@/app/components/Header/header.component";
import { InputSearch } from "@/app/components/InputSearch/input-search.component";

interface SearchHeaderProps {
  onSearch: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  searchedUsername: string;
  errorCode: number | null;
}

export function SearchHeader({
  onSearch,
  setUsername,
  searchedUsername,
}: SearchHeaderProps) {
  const router = useRouter();

  const handleSearch = useCallback(() => {
    onSearch();
  }, [onSearch]);

  const handleFavoritesClick: () => void = () => {
    router.push(`/favorites?username=${searchedUsername}`);
  };

  return (
    <Header>
      <InputSearch onSearch={handleSearch} setUsername={setUsername} />
      <Button aria-label="Ver favoritos" onClick={handleFavoritesClick}>
        <HeartIcon className="w-6 h-6" aria-hidden="true" />
        <span>Favoritos</span>
      </Button>
    </Header>
  );
}

export function SearchHeaderFactory(props: SearchHeaderProps) {
  return <SearchHeader {...props} />;
}
