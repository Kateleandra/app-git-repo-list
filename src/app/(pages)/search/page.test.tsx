import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useUserSearch } from "@/app/context/UserSearchContext";
import useRepos from "@/hooks/useRepos";
import { useRenderMessage } from "@/hooks/useRenderMessage";
import SearchPage from "./page";

// Mock hooks and components
jest.mock("@/app/context/UserSearchContext");
jest.mock("@/hooks/useRepos");
jest.mock("@/hooks/useRenderMessage");
jest.mock("@/app/components/CustomError/custom-error.component", () => ({
  CustomError: ({ code }: { code: number }) => <div>Error: {code}</div>,
}));

describe("SearchPage", () => {
  it("renders CustomError when errorCode is present", () => {
    (useUserSearch as jest.Mock).mockReturnValue({
      username: "testuser",
      userInfo: null,
      errorCode: 404,
    });
    (useRepos as jest.Mock).mockReturnValue({
      repos: [],
      loading: false,
    });

    render(<SearchPage />);

    expect(screen.getByText("Error: 404")).toBeInTheDocument();
  });

  it("renders the message returned by useRenderMessage", () => {
    (useUserSearch as jest.Mock).mockReturnValue({
      username: "testuser",
      userInfo: { name: "Test User" },
      errorCode: null,
    });
    (useRepos as jest.Mock).mockReturnValue({
      repos: [{ id: 1, name: "Repo1" }],
      loading: false,
    });
    (useRenderMessage as jest.Mock).mockReturnValue(
      <div>Rendered Message</div>
    );

    render(<SearchPage />);

    expect(screen.getByText("Rendered Message")).toBeInTheDocument();
  });
});
