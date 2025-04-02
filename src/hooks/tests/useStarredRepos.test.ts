import { renderHook, waitFor } from "@testing-library/react";
import { useStarredRepos } from "../useStarredRepos";

global.fetch = jest.fn();

describe("useStarredRepos", () => {
  const mockUsername = "testuser";
  const mockRepos = [
    {
      id: 1,
      name: "Repo1",
      description: "Test Repo 1",
      url: "http://repo1.com",
    },
    {
      id: 2,
      name: "Repo2",
      description: "Test Repo 2",
      url: "http://repo2.com",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useStarredRepos(mockUsername));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.favoriteRepos).toEqual([]);
  });

  it("should fetch and return starred repositories", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const { result } = renderHook(() => useStarredRepos(mockUsername));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.favoriteRepos).toEqual(mockRepos);
  });

  it("should handle fetch errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useStarredRepos(mockUsername));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to fetch starred repositories");
    expect(result.current.favoriteRepos).toEqual([]);
  });
});
