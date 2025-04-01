import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RepoList } from "./repo-list.component";
import { toggleFavorite, isFavorited } from "@/utils/favorites";

jest.mock("@/utils/favorites", () => ({
  toggleFavorite: jest.fn(),
  isFavorited: jest.fn(),
}));

const mockRepos = [
  {
    id: "1",
    name: "Repo 1",
    description: "Description 1",
    html_url: "https://github.com/repo1",
    language: "JavaScript",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Repo 2",
    description: "Description 2",
    html_url: "https://github.com/repo2",
    language: "Python",
    updated_at: "2023-02-01T00:00:00Z",
  },
];

describe("RepoList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the list of repositories", () => {
    (isFavorited as jest.Mock).mockImplementation(() => false);

    render(
      <RepoList repos={mockRepos} onLoadMore={jest.fn()} loading={false} />
    );

    expect(screen.getByText("Repositórios")).toBeInTheDocument();
    mockRepos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
      expect(screen.getByText(repo.description)).toBeInTheDocument();
      expect(screen.getByText(repo.language)).toBeInTheDocument();
      expect(
        screen.getByText(
          `Última atualização em ${new Date(
            repo.updated_at
          ).toLocaleDateString()}`
        )
      ).toBeInTheDocument();
    });
  });

  it("calls toggleFavorite when the favorite button is clicked", () => {
    (isFavorited as jest.Mock).mockImplementation(() => false);

    render(
      <RepoList repos={mockRepos} onLoadMore={jest.fn()} loading={false} />
    );

    const favoriteButtons = screen.getAllByRole("button");
    fireEvent.click(favoriteButtons[0]);

    expect(toggleFavorite).toHaveBeenCalledWith({
      ...mockRepos[0],
      id: mockRepos[0].id.toString(),
    });
  });

  it("displays the correct favorite state", () => {
    (isFavorited as jest.Mock).mockImplementation((id) => id === "1");

    render(
      <RepoList repos={mockRepos} onLoadMore={jest.fn()} loading={false} />
    );

    const favoriteButtons = screen.getAllByRole("button");
    expect(favoriteButtons[0]).toHaveClass("bg-primary");
    expect(favoriteButtons[1]).toHaveClass("bg-gray-100");
  });

  it("displays loading text when loading is true", () => {
    render(<RepoList repos={[]} onLoadMore={jest.fn()} loading={true} />);

    expect(
      screen.getByText("Carregando mais repositórios...")
    ).toBeInTheDocument();
  });
});
