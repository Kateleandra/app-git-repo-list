import React from "react";
import { render } from "@testing-library/react";
import { useRenderMessage } from "../useRenderMessage";
import "@testing-library/jest-dom";
jest.mock("next/image", () => (props: any) => <img {...props} />);

describe("useRenderMessage", () => {
  const renderHookResult = (props: any) => {
    const HookComponent = () => useRenderMessage(props);
    return render(<HookComponent />);
  };

  it("renders EmptyState when username is null", () => {
    const { getByText } = renderHookResult({
      username: null,
      userInfo: null,
      repos: [],
      reposLoading: false,
    });

    expect(
      getByText("Procure pelo Nome ou Nome de Usuário")
    ).toBeInTheDocument();
    expect(
      getByText(
        "Encontre os repositórios de algum usuário digitando no campo acima."
      )
    ).toBeInTheDocument();
  });

  it("renders UserNotFound when userInfo is null and username is provided", () => {
    const { getByText } = renderHookResult({
      username: "nonexistentuser",
      userInfo: null,
      repos: [],
      reposLoading: false,
    });

    expect(getByText('"nonexistentuser"')).toBeInTheDocument();
    expect(getByText("Nenhum usuário encontrado")).toBeInTheDocument();
    expect(
      getByText("Verifique se a escrita está correta ou tente novamente.")
    ).toBeInTheDocument();
  });

  it("renders UserInfoSection when userInfo is provided", () => {
    const mockUserInfo = {
      name: "John Doe",
      login: "johndoe",
      bio: "Software Developer",
      location: "Earth",
    };

    const mockRepos = [
      {
        id: 1,
        name: "repo1",
        description: "Test repo",
        url: "https://github.com/repo1",
        html_url: "https://github.com/repo1",
        updated_at: "2023-01-01",
      },
    ];

    const { getByText } = renderHookResult({
      username: "johndoe",
      userInfo: mockUserInfo,
      repos: mockRepos,
      reposLoading: false,
    });

    expect(getByText("Repositórios")).toBeInTheDocument();
    expect(getByText("repo1")).toBeInTheDocument();
  });
});
