import { useState } from "react";

interface UserInfo {
  id: string;
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  public_repos: number;
  repos_url: string;
  avatar_url: string;
}

interface FetchUserService {
  fetchUserData(username: string): Promise<UserInfo>;
}
class GitHubUserService implements FetchUserService {
  async fetchUserData(username: string): Promise<UserInfo> {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return response.json();
  }
}

export default function useFetchUser(
  service: FetchUserService = new GitHubUserService()
) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (username: string) => {
    setLoading(true);
    setError(null);
    setUserInfo(null);

    try {
      const user = await service.fetchUserData(username);
      setUserInfo(user);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { userInfo, error, loading, fetchUser };
}
