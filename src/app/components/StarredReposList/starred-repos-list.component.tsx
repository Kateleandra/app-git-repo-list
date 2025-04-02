import React from "react";
import { useStarredRepos } from "@/hooks/useStarredRepos";
import { RepoList } from "@/app/components/RepoList/repo-list.component";

type StarredRepo = {
  id: number;
  name: string;
  url: string;
  [key: string]: any;
};

type StarredReposListProps = {
  username: string;
  favoriteRepos: StarredRepo[];
  onToggleFavorite: (repoId: string) => void;
};

export function toggleFavorite(repoId: string): void {
  console.log(`Toggling favorite status for repo with ID: ${repoId}`);
}

export function StarredReposList({ username }: StarredReposListProps) {
  const { starredRepos = [], loading } = useStarredRepos(username);

  return (
    <div>
      <RepoList
        repos={starredRepos.map((repo: StarredRepo) => ({
          ...repo,
          html_url: repo.url,
          updated_at: new Date().toISOString(),
        }))}
        loading={loading}
      />
    </div>
  );
}
