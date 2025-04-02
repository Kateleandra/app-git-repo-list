import React from "react";
import Image from "next/image";
import { Typography } from "../../components/Typography/typography.component";

type SearchResultProps = {
  userInfo: any;
  searchedUsername: string;
  isLoading?: boolean;
  error?: string;
};

export function SearchResult({
  userInfo,
  searchedUsername,
  isLoading,
  error,
}: SearchResultProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-[auto] h-[auto] gap-4 p-8">
        <Typography variant="h1" color="primary">
          Carregando...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-[auto] h-[auto] gap-4 p-8">
        <Typography variant="h1" color="grey">
          {error}
        </Typography>
      </div>
    );
  }

  if (!userInfo && searchedUsername !== "") {
    return (
      <div className="flex flex-col items-center justify-center w-[auto] h-[auto] gap-4 p-8">
        <Typography variant="h1" color="primary">
          &quot;{searchedUsername}&quot;
        </Typography>
        <Typography variant="h1" color="grey">
          Nenhum usuário encontrado
        </Typography>
        <Typography variant="p" color="grey">
          Verifique se a escrita está correta ou tente novamente.
        </Typography>
        <Image
          className="mt-12"
          src="/undraw_taken.svg"
          alt="People Search"
          width={300}
          height={300}
        />
      </div>
    );
  }

  if (userInfo) {
    return (
      <div className="flex flex-col items-center justify-center w-[auto] h-[auto] gap-2 p-8">
        <Typography variant="h1" color="primary">
          {userInfo.name || userInfo.login}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-[auto] h-[auto] gap-2 p-8">
      <Typography variant="h1" color="grey">
        Procure pelo Nome ou Nome de Usuário
      </Typography>
      <Typography variant="p" color="grey">
        Encontre os repositórios de algum usuário digitando no campo acima.
      </Typography>
      <Image
        className="mt-12"
        src="/people_search.svg"
        alt="People Search"
        width={300}
        height={300}
      />
    </div>
  );
}
