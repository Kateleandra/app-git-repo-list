export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
  isFavorite?: boolean;
}

export const mockFavoriteRepos: Repo[] = [
  {
    id: 1,
    name: "mock-repo-1",
    description: "This is a mock repository 1",
    html_url: "https://github.com/mock-repo-1",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "mock-repo-2",
    description: "This is a mock repository 2",
    html_url: "https://github.com/mock-repo-2",
    updated_at: "2023-01-02T00:00:00Z",
  },
];

export function useMockFavorites(): {
  favoriteRepos: Repo[];
  loading: boolean;
  error: string | null;
} {
  return {
    favoriteRepos: mockFavoriteRepos,
    loading: false,
    error: null,
  };
}
