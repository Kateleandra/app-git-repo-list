import { useState, useEffect } from "react";

interface StarredRepo {
  id: number;
  name: string;
  description: string;
  url: string;
}

interface UseStarredReposResult {
  favoriteRepos: StarredRepo[];
  loading: boolean;
  error: string | null;
  starredRepos: StarredRepo[];
}

async function fetchStarredRepos(username: string): Promise<StarredRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/starred`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch starred repositories");
  }
  return response.json();
}

export const useStarredRepos = (username: string): UseStarredReposResult => {
  const [favoriteRepos, setFavoriteRepos] = useState<StarredRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStarredRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStarredRepos(username);
        setFavoriteRepos(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserStarredRepos();
    }
  }, [username]);

  return { favoriteRepos, loading, error, starredRepos: favoriteRepos };
};
