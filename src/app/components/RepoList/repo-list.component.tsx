import React from "react";
import { toggleFavorite, isFavorited } from "@/utils/favorites";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Typography } from "../Typography/typography.component";

interface Repo {
  id: number | string;
  name: string;
  description?: string;
  html_url: string;
  language?: string;
  updated_at: string;
}

interface RepoListProps {
  repos: Repo[];
  onLoadMore: () => void;
  loading: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  TypeScript: "#2b7489",
  Ruby: "#701516",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  PHP: "#4F5D95",
  Go: "#00ADD8",
  Shell: "#89e051",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  default: "#cccccc",
};

const getLanguageColor = (language?: string): string =>
  LANGUAGE_COLORS[language ?? "default"];

export function RepoList({ repos, loading }: RepoListProps) {
  return (
    <div>
      <Typography className="pb-6" variant="h1" color="primary">
        Repositórios
      </Typography>
      <ul className="flex flex-col gap-y-4">
        {repos.map((repo) => {
          const isRepoFavorited = isFavorited(repo.id.toString());
          return (
            <li
              key={repo.id}
              className="flex justify-between p-4 rounded border border-gray-300"
            >
              <div className="flex flex-col gap-y-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography variant="h2" color="grey">
                    {repo.name}
                  </Typography>
                </a>
                <Typography variant="p" color="grey">
                  {repo.description || "Sem descrição disponível"}
                </Typography>
                <div className="flex justify-between gap-4">
                  <Typography
                    variant="p"
                    color="grey"
                    className="flex items-center gap-2"
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: getLanguageColor(repo.language),
                      }}
                    ></span>
                    {repo.language || "Não especificada"}
                  </Typography>
                  <Typography variant="p" color="grey">
                    Última atualização em{" "}
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
              <button
                onClick={() =>
                  toggleFavorite({ ...repo, id: repo.id.toString() })
                }
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                  isRepoFavorited
                    ? "border-[#32C0C6] bg-primary"
                    : "border-gray-200 bg-gray-100"
                }`}
              >
                <HeartIcon
                  className="w-6 h-6"
                  aria-hidden="true"
                  style={{ color: isRepoFavorited ? "#32C0C6" : "#8C8C8C" }}
                />
              </button>
            </li>
          );
        })}
      </ul>
      {loading && <p>Carregando mais repositórios...</p>}
    </div>
  );
}
