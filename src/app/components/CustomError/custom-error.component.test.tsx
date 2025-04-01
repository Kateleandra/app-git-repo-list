import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomError } from "./custom-error.component";

describe("CustomError Component", () => {
  it("renders the correct error message for a known error code", () => {
    render(<CustomError code={404} />);
    expect(screen.getByText("Erro 404")).toBeInTheDocument();
    expect(screen.getByText("Usuário não encontrado.")).toBeInTheDocument();
  });

  it("renders the default error message for an unknown error code", () => {
    render(<CustomError code={500} />);
    expect(screen.getByText("Erro 500")).toBeInTheDocument();
    expect(
      screen.getByText("Ocorreu um erro inesperado. Tente novamente.")
    ).toBeInTheDocument();
  });

  it("renders the correct error message for another known error code", () => {
    render(<CustomError code={403} />);
    expect(screen.getByText("Erro 403")).toBeInTheDocument();
    expect(
      screen.getByText("Acesso negado. Tente novamente mais tarde.")
    ).toBeInTheDocument();
  });
});
