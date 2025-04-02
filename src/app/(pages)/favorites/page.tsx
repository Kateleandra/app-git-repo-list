"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@/app/components/Typography/typography.component";
import { useStarredRepos } from "@/hooks/useStarredRepos";
import { Button } from "@/app/components/Button/button.component.tsx";
import { StarredReposList } from "@/app/components/StarredReposList/starred-repos-list.component";
import { toggleFavorite } from "@/utils/favorites";

export default function FavoritesPage() {
  const router = useRouter();
  const [searchedUsername, setSearchedUsername] = useState("guest");

  useEffect(() => {
    const username = localStorage.getItem("username") || "guest";
    setSearchedUsername(username);
  }, []);

  const { favoriteRepos, loading, error } = useStarredRepos(searchedUsername);

  const renderContent = useMemo(() => {
    if (error) {
      return (
        <Typography variant="p" color="danger" aria-live="polite">
          Erro: {error}
        </Typography>
      );
    }
    return (
      <StarredReposList
        username={searchedUsername}
        favoriteRepos={favoriteRepos}
        onToggleFavorite={(repoId: string) => toggleFavorite({ id: repoId })}
      />
    );
  }, [error, loading, favoriteRepos, searchedUsername]);

  return (
    <div className="container mx-auto grid gap-8">
      {renderContent}

      <Typography className="text-center" variant="h1" color="primary">
        Meus favoritos
      </Typography>
      <Button
        className="text-blue-500 underline"
        onClick={() => router.push("/search")}
      >
        Voltar
      </Button>
    </div>
  );
}
