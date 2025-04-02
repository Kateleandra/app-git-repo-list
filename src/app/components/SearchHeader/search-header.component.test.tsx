import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { SearchHeader } from "./search-header.component";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchHeader Component", () => {
  const mockPush = jest.fn();
  const mockOnSearch = jest.fn();
  const mockSetUsername = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SearchHeader component", () => {
    render(
      <SearchHeader
        onSearch={mockOnSearch}
        setUsername={mockSetUsername}
        username="testuser"
        searchedUsername="testuser"
        errorCode={null}
      />
    );

    expect(
      screen.getByRole("button", { name: "Ver favoritos" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("navigates to favorites when the favorites button is clicked", () => {
    render(
      <SearchHeader
        onSearch={mockOnSearch}
        setUsername={mockSetUsername}
        username="testuser"
        searchedUsername="testuser"
        errorCode={null}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Ver favoritos" }));
    expect(mockPush).toHaveBeenCalledWith("/favorites?username=testuser");
  });

  it("clears the username when clear is triggered", () => {
    render(
      <SearchHeader
        onSearch={mockOnSearch}
        setUsername={mockSetUsername}
        username="testuser"
        searchedUsername="testuser"
        errorCode={null}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });
    expect(mockSetUsername).toHaveBeenCalledWith("");
  });
});
