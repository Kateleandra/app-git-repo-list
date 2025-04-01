import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputSearch } from "./input-search.component";

describe("InputSearch Component", () => {
  it("renders the input field and search button", () => {
    render(<InputSearch />);
    expect(screen.getByPlaceholderText("Buscar usuário")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar/i })).toBeInTheDocument();
  });

  it("calls onChange and setUsername when typing in the input field", () => {
    const onChangeMock = jest.fn();
    const setUsernameMock = jest.fn();
    render(
      <InputSearch onChange={onChangeMock} setUsername={setUsernameMock} />
    );

    const input = screen.getByPlaceholderText("Buscar usuário");
    fireEvent.change(input, { target: { value: "test user" } });

    expect(onChangeMock).toHaveBeenCalledWith("test user");
    expect(setUsernameMock).toHaveBeenCalledWith("test user");
  });

  it("calls onSearch when the search button is clicked", () => {
    const onSearchMock = jest.fn();
    render(<InputSearch onSearch={onSearchMock} />);

    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalled();
  });

  it("applies the provided className to the container", () => {
    const customClass = "custom-class";
    render(<InputSearch className={customClass} />);

    const container = screen.getByRole("search");
    expect(container).toHaveClass(customClass);
  });
});
