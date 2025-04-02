interface Repository {
  id: string;
  [key: string]: any;
}

export function toggleFavorite(repo: Repository): void {
  const storedFavorites = localStorage.getItem("favorites");
  const favorites: Repository[] = storedFavorites
    ? JSON.parse(storedFavorites)
    : [];
  const isFavorited = favorites.some((fav) => fav.id === repo.id);

  if (isFavorited) {
    const updatedFavorites = favorites.filter((fav) => fav.id !== repo.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  } else {
    favorites.push(repo);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

export function isFavorited(repoId: string): boolean {
  const storedFavorites = localStorage.getItem("favorites");
  const favorites: Repository[] = storedFavorites
    ? JSON.parse(storedFavorites)
    : [];
  return favorites.some((fav: Repository) => fav.id === repoId);
}
