"use client";

import React from "react";
import useFetchUser from "@/hooks/useFetchUser";
import { SearchHeader } from "@/app/presentation/components/SearchHeader/search-header.component";

export default function InteractiveSearchHeader() {
  const { fetchUser } = useFetchUser();

  const handleSearch = async () => {
    try {
      const userData = await fetchUser(username);
      console.log("User Data:", userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const [username, setUsername] = React.useState<string>("");

  React.useEffect(() => {
    console.log("Username:", username);
  }, [username]);

  return (
    <SearchHeader
      onSearch={handleSearch}
      setUsername={setUsername}
      username={username}
      searchedUsername={username}
      errorCode={null}
    />
  );
}
