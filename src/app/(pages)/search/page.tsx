"use client";

import React, { useState, useCallback, useMemo } from "react";
import useFetchUser from "@/hooks/useFetchUser";
import useRepos from "@/hooks/useRepos";
import Image from "next/image";
import { UserCard } from "@/app/presentation/components/User/user-card.component";
import { RepoList } from "@/app/presentation/components/RepoList/repo-list.component";
import { Typography } from "@/app/presentation/components/Typography/typography.component";
import { CustomError } from "@/app/presentation/components/CustomError/custom-error.component";
import { SearchHeaderFactory } from "@/app/presentation/components/SearchHeader/search-header.component";

export default function SearchPage() {
  const [username, setUsername] = useState("");
  const { userInfo, fetchUser } = useFetchUser();
  const { repos, loading: reposLoading } = useRepos(username);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const handleSearch = useCallback(() => {
    fetchUser(username)
      .then(() => setErrorCode(null))
      .catch((error) => setErrorCode(error.code));
  }, [fetchUser, username]);

  const renderMessage = useMemo(() => {
    if (userInfo) {
      return (
        <div className="mx-auto px-2 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 py-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <UserCard
              user={{
                ...userInfo,
                name: userInfo.name ?? undefined,
                login:
                  typeof userInfo.login === "string"
                    ? userInfo.login
                    : undefined,
                bio: userInfo.bio ?? undefined,
                location: userInfo.location ?? undefined,
              }}
            />
            <RepoList repos={repos} loading={reposLoading} />
          </div>
        </div>
      );
    }

    if (username) {
      return (
        <div
          className="flex flex-col items-center justify-center w-auto h-auto gap-4 p-8"
          aria-live="polite"
        >
          <Typography variant="h1" color="primary">
            "{username}"
          </Typography>
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
        </div>
      );
    }

    return (
      <div
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
      </div>
    );
  }, [userInfo, username, repos, reposLoading]);

  if (errorCode) return <CustomError code={errorCode} />;

  return (
    <>
      <SearchHeaderFactory
        onSearch={handleSearch}
        setUsername={setUsername}
        username={username}
        searchedUsername={username}
        errorCode={errorCode}
      />
      {renderMessage}
    </>
  );
}
