import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { useStarredRepos } from "@/hooks/useStarredRepos";
import FavoritesPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useStarredRepos", () => ({
  useStarredRepos: jest.fn(),
}));

jest.mock("@/utils/favorites", () => ({
  toggleFavorite: jest.fn(),
}));

describe("FavoritesPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("displays an error message when there is an error", async () => {
    (useStarredRepos as jest.Mock).mockReturnValue({
      favoriteRepos: [],
      loading: false,
      error: "Failed to fetch",
    });

    render(<FavoritesPage />);

    await waitFor(() => {
      expect(screen.getByText("Erro: Failed to fetch")).toBeInTheDocument();
    });
  });

  it("navigates back to the search page when the button is clicked", async () => {
    (useStarredRepos as jest.Mock).mockReturnValue({
      favoriteRepos: [],
      loading: false,
      error: null,
    });

    render(<FavoritesPage />);

    const backButton = screen.getByText("Voltar");
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/search");
    });
  });
});
