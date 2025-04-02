"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@/app/components/Typography/typography.component";
import { RepoList } from "@/app/components/RepoList/repo-list.component";
import { Loading } from "@/app/components/Loading/loading.component";
import { useStarredRepos } from "@/hooks/useStarredRepos";
import { Button } from "@/app/components/Button/button.component.tsx";

export default function FavoritesPage() {
  const { favoriteRepos, loading, error } = useStarredRepos();
  const router = useRouter();

  const renderContent = useMemo(() => {
    if (error) {
      return (
        <Typography variant="p" color="danger" aria-live="polite">
          Erro: {error}
        </Typography>
      );
    }
    if (loading) {
      return <Loading message="Carregando seus repositórios favoritos..." />;
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
    <div className="container mx-auto px-4 py-8 grid gap-8">
      <Typography className="text-center" variant="h1" color="primary">
        Meus favoritos
      </Typography>
      {renderContent}
      <Button
        className="text-blue-500 underline"
        onClick={() => router.push("/search")}
      >
        Voltar
      </Button>
    </div>
  );
}
