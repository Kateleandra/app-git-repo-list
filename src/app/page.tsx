import React, { Suspense } from "react";
import FavoritesPage from "./(pages)/favorites/page";
import SearchNotFoundPage from "./(pages)/search-not-found/page";
import SearchPage from "./(pages)/search/page";
import Loading from "./loading";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <SearchPage />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <FavoritesPage />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <SearchNotFoundPage />
      </Suspense>
    </div>
  );
}
