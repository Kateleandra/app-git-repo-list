import React from "react";
import { Typography } from "../Typography/typography.component";

interface CustomErrorProps {
  code: number;
}

const ERROR_MESSAGES: Record<number, string> = {
  404: "Usuário não encontrado.",
  403: "Acesso negado. Tente novamente mais tarde.",
};

const DEFAULT_ERROR_MESSAGE = "Ocorreu um erro inesperado. Tente novamente.";

export const CustomError: React.FC<CustomErrorProps> = ({ code }) => {
  const errorMessage = ERROR_MESSAGES[code] || DEFAULT_ERROR_MESSAGE;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8">
      <Typography variant="h1" color="grey" aria-level={1}>
        Erro {code}
      </Typography>
      <Typography variant="p" color="grey">
        {errorMessage}
      </Typography>
    </div>
  );
};
