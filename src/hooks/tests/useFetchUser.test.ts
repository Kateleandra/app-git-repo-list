import { act, renderHook } from "@testing-library/react";
import useFetchUser from "../useFetchUser";

const mockUserInfo = {
  id: "1",
  login: "testuser",
  name: "Test User",
  bio: "This is a test user",
  location: "Test Location",
  public_repos: 10,
  repos_url: "https://api.github.com/users/testuser/repos",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
};

class MockFetchUserService {
  async fetchUserData(username: string) {
    if (username === "error") {
      throw new Error("User not found");
    }
    return mockUserInfo;
  }
}

describe("useFetchUser", () => {
  it("should fetch user data successfully", async () => {
    const { result } = renderHook(() =>
      useFetchUser(new MockFetchUserService())
    );

    await act(async () => {
      await result.current.fetchUser("testuser");
    });

    expect(result.current.userInfo).toEqual(mockUserInfo);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should handle errors when fetching user data", async () => {
    const { result } = renderHook(() =>
      useFetchUser(new MockFetchUserService())
    );

    await act(async () => {
      await result.current.fetchUser("error");
    });

    expect(result.current.userInfo).toBeNull();
    expect(result.current.error).toBe("User not found");
    expect(result.current.loading).toBe(false);
  });

  it("should set loading state correctly", async () => {
    const { result } = renderHook(() =>
      useFetchUser(new MockFetchUserService())
    );

    await act(async () => {
      await result.current.fetchUser("testuser");
    });

    expect(result.current.loading).toBe(false);
  });
});
