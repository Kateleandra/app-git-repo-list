"use client";

import React, { Suspense, useState } from "react";
import FavoritesPage from "./(pages)/favorites/page";
import SearchNotFoundPage from "./(pages)/search-not-found/page";
import SearchPage from "./(pages)/search/page";
import Loading from "./loading";

export default function Home() {
  const [activePage, setActivePage] = useState<
    "search" | "favorites" | "not-found"
  >("search");

  return (
    <div>
      <Suspense fallback={<Loading />}>
        {activePage === "search" && <SearchPage />}
        {activePage === "favorites" && <FavoritesPage />}
        {activePage === "not-found" && <SearchNotFoundPage />}
      </Suspense>
    </div>
  );
}
