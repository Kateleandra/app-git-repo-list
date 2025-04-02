import React from "react";
import { UserCard } from "./user-card.component";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("UserCard Component", () => {
  const mockUser = {
    name: "John Doe",
    login: "johndoe",
    bio: "Software Developer",
    location: "San Francisco",
    avatar_url: "https://example.com/avatar.jpg",
  };

  it("renders default values when user data is missing", () => {
    render(<UserCard user={{}} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByAltText("User avatar")).toHaveAttribute(
      "src",
      "/avatar.svg"
    );
  });

  it("does not render bio and location if not provided", () => {
    render(<UserCard user={{ name: "Jane Doe", login: "janedoe" }} />);

    expect(screen.queryByText("Software Developer")).not.toBeInTheDocument();
    expect(screen.queryByText("San Francisco")).not.toBeInTheDocument();
  });

  it("renders the default avatar when avatar_url is not provided", () => {
    render(<UserCard user={{ name: "Jane Doe", login: "janedoe" }} />);

    expect(screen.getByAltText("User avatar")).toHaveAttribute(
      "src",
      "/avatar.svg"
    );
  });

  it("handles empty user object gracefully", () => {
    render(<UserCard user={{}} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByAltText("User avatar")).toHaveAttribute(
      "src",
      "/avatar.svg"
    );
  });

  it("does not render undefined or null values for optional fields", () => {
    render(
      <UserCard
        user={{
          name: "Jane Doe",
          login: "janedoe",
          bio: undefined,
          location: undefined,
        }}
      />
    );

    expect(screen.queryByText("null")).not.toBeInTheDocument();
    expect(screen.queryByText("undefined")).not.toBeInTheDocument();
  });
});
