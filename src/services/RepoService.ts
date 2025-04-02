import { Repo } from "../models/Repo";

export class RepoService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "https://api.github.com") {
    this.baseUrl = baseUrl;
  }

  async getRepos(username: string): Promise<Repo[]> {
    const response = await fetch(`${this.baseUrl}/users/${username}/repos`);
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return response.json();
  }

  async getStarredRepos(username: string): Promise<Repo[]> {
    const response = await fetch(`${this.baseUrl}/users/${username}/starred`);
    if (!response.ok) {
      throw new Error("Failed to fetch starred repositories");
    }
    return response.json();
  }
}
