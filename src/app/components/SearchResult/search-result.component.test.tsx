import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SearchResult } from "./search-result.component";

describe("SearchResult Component", () => {
  it("renders 'Nenhum usuário encontrado' when no userInfo is provided and searchedUsername is not empty", () => {
    render(<SearchResult userInfo={null} searchedUsername="testuser" />);

    expect(screen.getByText(/"testuser"/i)).toBeInTheDocument();
    expect(screen.getByText(/Nenhum usuário encontrado/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Verifique se a escrita está correta ou tente novamente./i
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText(/People Search/i)).toBeInTheDocument();
  });

  it("renders user information when userInfo is provided", () => {
    const mockUserInfo = { name: "John Doe", login: "johndoe" };
    render(<SearchResult userInfo={mockUserInfo} searchedUsername="" />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it("renders default message when no search has been performed", () => {
    render(<SearchResult userInfo={null} searchedUsername="" />);

    expect(
      screen.getByText(/Procure pelo Nome ou Nome de Usuário/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Encontre os repositórios de algum usuário digitando no campo acima./i
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText(/People Search/i)).toBeInTheDocument();
  });

  it("does not render user information when userInfo is null", () => {
    render(<SearchResult userInfo={null} searchedUsername="testuser" />);

    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/johndoe/i)).not.toBeInTheDocument();
  });

  it("renders a loading state when a search is in progress", () => {
    render(
      <SearchResult
        userInfo={null}
        searchedUsername="loading"
        isLoading={true}
      />
    );

    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it("renders an error message when there is an error", () => {
    render(
      <SearchResult
        userInfo={null}
        searchedUsername="error"
        error="Something went wrong"
      />
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("renders 'Carregando...' when isLoading is true", () => {
    render(
      <SearchResult userInfo={null} searchedUsername="" isLoading={true} />
    );

    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it("renders error message when error is provided", () => {
    render(
      <SearchResult
        userInfo={null}
        searchedUsername=""
        error="Erro ao buscar usuário"
      />
    );

    expect(screen.getByText(/Erro ao buscar usuário/i)).toBeInTheDocument();
  });

  it("renders user name when userInfo contains only name", () => {
    const mockUserInfo = { name: "Jane Doe", login: "" };
    render(<SearchResult userInfo={mockUserInfo} searchedUsername="" />);

    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  it("renders user login when userInfo contains only login", () => {
    const mockUserInfo = { name: "", login: "janedoe" };
    render(<SearchResult userInfo={mockUserInfo} searchedUsername="" />);

    expect(screen.getByText(/janedoe/i)).toBeInTheDocument();
  });

  it("renders default message when no userInfo and searchedUsername are empty", () => {
    render(<SearchResult userInfo={null} searchedUsername="" />);

    expect(
      screen.getByText(/Procure pelo Nome ou Nome de Usuário/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Encontre os repositórios de algum usuário digitando no campo acima./i
      )
    ).toBeInTheDocument();
  });
});
