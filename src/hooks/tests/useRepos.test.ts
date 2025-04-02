import { renderHook, waitFor } from "@testing-library/react";
import useRepos from "../useRepos";

global.fetch = jest.fn();

describe("useRepos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return repositories successfully", async () => {
    const mockRepos = [
      { id: 1, name: "repo1" },
      { id: 2, name: "repo2" },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const { result } = renderHook(() => useRepos("testuser"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.repos).toEqual(mockRepos);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useRepos("testuser"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.repos).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch repositories");
  });

  it("should handle network errors", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useRepos("testuser"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.repos).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });
});
