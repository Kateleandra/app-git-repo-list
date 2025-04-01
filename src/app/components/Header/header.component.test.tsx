import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./header.component";

describe("Header Component", () => {
  it("renders children correctly", () => {
    render(
      <Header>
        <h1>Test Header</h1>
      </Header>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Test Header")).toBeInTheDocument();
  });

  it("applies the className prop", () => {
    const customClass = "custom-class";
    render(
      <Header className={customClass}>
        <h1>Test Header</h1>
      </Header>
    );
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass(customClass);
  });
});
