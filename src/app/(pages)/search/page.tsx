"use client";

import React from "react";
import { useUserSearch } from "@/app/context/UserSearchContext";
import useRepos from "@/hooks/useRepos";

import { CustomError } from "@/app/components/CustomError/custom-error.component";
import { useRenderMessage } from "@/hooks/useRenderMessage";

export default function SearchPage() {
  const { username, userInfo, errorCode } = useUserSearch();
  const { repos, loading: reposLoading } = useRepos(username);

  const renderMessage = useRenderMessage({
    username,
    userInfo,
    repos,
    reposLoading,
  });

  if (errorCode) return <CustomError code={errorCode} />;

  return <main role="main">{renderMessage}</main>;
}
