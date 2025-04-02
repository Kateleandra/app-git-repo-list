import React, { useMemo } from "react";
import Image from "next/image";
import { Typography } from "@/app/components/Typography/typography.component";
import { UserCard } from "@/app/components/User/user-card.component";
import { RepoList } from "@/app/components/RepoList/repo-list.component";

interface RenderMessageProps {
  username: string | null;
  userInfo: UserInfo | null;
  repos: Repo[];
  reposLoading: boolean;
}

interface UserInfo {
  name?: string;
  login?: string;
  bio?: string;
  location?: string;
}

interface Repo {
  id: number;
  name: string;
  description?: string;
  url: string;
  html_url: string;
  updated_at: string;
}

const EmptyState: React.FC = () => (
  <section
    className="flex flex-col items-center justify-center w-auto h-auto gap-2 p-8"
    aria-live="polite"
  >
    <Typography variant="h1" color="grey">
      Procure pelo Nome ou Nome de Usuário
    </Typography>
    <Typography variant="p" color="grey">
      Encontre os repositórios de algum usuário digitando no campo acima.
    </Typography>
    <Image
      className="mt-12"
      src="/people_search.svg"
      alt="Busca de pessoas"
      width={300}
      height={300}
    />
  </section>
);

const UserNotFound: React.FC<{
  username: string;
  searchPerformed: boolean;
}> = ({ username, searchPerformed }) => (
  <section
    className="flex flex-col items-center justify-center w-auto h-auto gap-4 p-8"
    aria-live="polite"
  >
    {searchPerformed && username && (
      <Typography variant="h1" color="primary">
        "{username}"
      </Typography>
    )}
    <Typography variant="h1" color="grey">
      Nenhum usuário encontrado
    </Typography>
    <Typography variant="p" color="grey">
      Verifique se a escrita está correta ou tente novamente.
    </Typography>
    <Image
      className="mt-12"
      src="/user_not_found.svg"
      alt="Usuário não encontrado"
      width={300}
      height={300}
    />
  </section>
);

const UserInfoSection: React.FC<{
  userInfo: UserInfo;
  repos: Repo[];
  reposLoading: boolean;
}> = ({ userInfo, repos, reposLoading }) => (
  <section className="mx-auto px-2 lg:px-8">
    <div className="mx-auto grid max-w-2xl grid-cols-1 py-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <UserCard
        user={{
          ...userInfo,
          name: userInfo.name ?? undefined,
          login: userInfo.login ?? undefined,
          bio: userInfo.bio ?? undefined,
          location: userInfo.location ?? undefined,
        }}
      />
      <div>
        <Typography className="pb-6" variant="h1" color="primary">
          Repositórios
        </Typography>
        <RepoList repos={repos} loading={reposLoading} />
      </div>
    </div>
  </section>
);

export function useRenderMessage({
  username,
  userInfo,
  repos,
  reposLoading,
}: RenderMessageProps) {
  const [searchPerformed, setSearchPerformed] = React.useState(false);

  React.useEffect(() => {
    if (username) {
      setSearchPerformed(true);
    }
  }, [username]);

  const displayUsername = userInfo?.login || (!username ? username : "");

  return useMemo(() => {
    if (!username && !searchPerformed) {
      return <EmptyState />;
    }

    if (userInfo) {
      return (
        <UserInfoSection
          userInfo={userInfo}
          repos={repos}
          reposLoading={reposLoading}
        />
      );
    }

    if (searchPerformed && displayUsername) {
      return (
        <UserNotFound
          username={displayUsername as string}
          searchPerformed={searchPerformed}
        />
      );
    }

    return null;
  }, [
    username,
    userInfo,
    repos,
    reposLoading,
    searchPerformed,
    displayUsername,
  ]);
}
