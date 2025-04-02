import { useState, ReactNode } from "react";

interface UserInfo {
  login: ReactNode;
  name: string | null;
  bio: string | null;
  location: string | null;
  public_repos: number;
  repos_url: string;
  avatar_url: string;
}

export default function useFetchUser() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState("");

  const fetchUser = async (username: string) => {
    try {
      setError("");
      setUserInfo(null);
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const user = await userResponse.json();
      setUserInfo(user);
      return user;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    }
  };

  return { userInfo, error, fetchUser };
}
