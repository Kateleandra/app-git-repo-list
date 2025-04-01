"use client";

import React, { useMemo } from "react";
import { useFavorites, Repo } from "@/hooks/useFavorites";
import { Typography } from "@/app/presentation/components/Typography/typography.component";
import { RepoList } from "@/app/presentation/components/RepoList/repo-list.component";

export default function FavoritesPage() {
  const {
    favoriteRepos,
    loading,
    error,
  }: { favoriteRepos: Repo[]; loading: boolean; error: string | null } =
    useFavorites("");

  const renderContent = useMemo(() => {
    if (error) {
      return (
        <Typography variant="p" color="danger" aria-live="polite">
          Erro: {error}
        </Typography>
      );
    }
    if (loading) {
      return (
        <Typography variant="p" color="grey" aria-live="polite">
          Carregando...
        </Typography>
      );
    }
    if (favoriteRepos.length === 0) {
      return (
        <Typography variant="p" color="grey" aria-live="polite">
          Nenhum repositório favorito encontrado.
        </Typography>
      );
    }
    return <RepoList repos={favoriteRepos} loading={loading} />;
  }, [error, loading, favoriteRepos]);

  return (
    <div className="container mx-auto px-4 py-6 text-center grid gap-8">
      <Typography variant="h1" color="primary">
        Meus favoritos
      </Typography>
      {renderContent}
    </div>
  );
}
