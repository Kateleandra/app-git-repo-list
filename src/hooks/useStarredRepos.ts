import { useState, useEffect } from "react";
import { Repo } from "@/mocks/useFavorites.mock";

export function useStarredRepos() {
  const [starredRepos, setStarredRepos] = useState<Repo[]>([]);
  const [favoriteRepos, setFavoriteRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarredRepos = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch("https://api.github.com/user/starred", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorMessage = `Erro ao buscar repositórios estrelados. Status: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setStarredRepos(data);

        const favorites = data.filter((repo: Repo) => repo.isFavorite);
        setFavoriteRepos(favorites);
      } catch (err) {
        setError(
          "Erro ao buscar repositórios estrelados. Verifique os logs para mais detalhes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStarredRepos();
  }, []);

  return { starredRepos, favoriteRepos, loading, error };
}
