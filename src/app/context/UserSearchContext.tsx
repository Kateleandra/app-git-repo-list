import React, { createContext, useState, useCallback, useContext } from "react";
import useFetchUser from "@/hooks/useFetchUser";

interface UserSearchContextProps {
  username: string;
  setUsername: (username: string) => void;
  userInfo: any;
  errorCode: number | null;
  handleSearch: () => void;
}

const UserSearchContext = createContext<UserSearchContextProps | undefined>(
  undefined
);

export const UserSearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState("");
  const { userInfo, fetchUser } = useFetchUser();
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const handleSearch = useCallback(() => {
    if (!username.trim()) {
      setErrorCode(null);
      return;
    }
    fetchUser(username)
      .then(() => setErrorCode(null))
      .catch((error) => {
        if (error.response?.status === 404) {
          setErrorCode(404);
        } else {
          setErrorCode(500);
        }
      });
  }, [fetchUser, username]);

  return (
    <UserSearchContext.Provider
      value={{ username, setUsername, userInfo, errorCode, handleSearch }}
    >
      {children}
    </UserSearchContext.Provider>
  );
};

export const useUserSearch = (): UserSearchContextProps => {
  const context = useContext(UserSearchContext);
  if (!context) {
    throw new Error("useUserSearch must be used within a UserSearchProvider");
  }
  return context;
};
