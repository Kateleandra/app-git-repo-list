import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Typography } from "./typography.component";

describe("Typography Component", () => {
  it("renders the correct variant and children", () => {
    render(
      <Typography variant="h1" color="primary">
        Test Heading
      </Typography>
    );
    const element = screen.getByLabelText("h1");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Test Heading");
  });

  it("applies the text-center class when center is true", () => {
    render(
      <Typography variant="h2" color="primary" center>
        Centered Text
      </Typography>
    );
    const element = screen.getByLabelText("h2");
    expect(element).toHaveClass("text-center");
  });

  it("applies additional custom class names", () => {
    render(
      <Typography variant="h5" color="primary" className="custom-class">
        Custom Class
      </Typography>
    );
    const element = screen.getByLabelText("h5");
    expect(element).toHaveClass("custom-class");
  });
});
