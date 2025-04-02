import React from "react";
import { render, screen } from "@testing-library/react";
import { Loading } from "./loading.component";

describe("Loading Component", () => {
  it("renders with default message", () => {
    render(<Loading />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    const customMessage = "Aguarde, carregando dados...";
    render(<Loading message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
