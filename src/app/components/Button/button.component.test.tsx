import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./button.component.tsx.jsx";

describe("Button Component", () => {
  it("should render the button with the correct text", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("should call the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when the disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });
});
