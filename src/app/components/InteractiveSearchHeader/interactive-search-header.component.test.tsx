import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InteractiveSearchHeader from "./interactive-search-header.component";
import useFetchUser from "@/hooks/useFetchUser";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/useFetchUser");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("InteractiveSearchHeader", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("renders the SearchHeader component", () => {
    render(<InteractiveSearchHeader />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("updates the username state on input change", () => {
    render(<InteractiveSearchHeader />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "testuser" } });
    expect(input).toHaveValue("testuser");
  });

  it("calls fetchUser on search", async () => {
    const mockFetchUser = jest.fn().mockResolvedValue({ name: "Test User" });
    (useFetchUser as jest.Mock).mockReturnValue({ fetchUser: mockFetchUser });

    render(<InteractiveSearchHeader />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "testuser" } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockFetchUser).toHaveBeenCalledWith("testuser");
  });
});
