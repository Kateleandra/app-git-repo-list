import FavoritesPage from "./(pages)/favorites/page";
import SearchNotFoundPage from "./(pages)/search-not-found/page";
import SearchPage from "./(pages)/search/page";
import UserPage from "./(pages)/user/page";
import { CustomError } from "./presentation/components/CustomError/custom-error.component";

export default function Home() {
  return (
    <div>
      <SearchPage />
      <FavoritesPage />
      <UserPage />
      <SearchNotFoundPage />
      <CustomError code={404} />
    </div>
  );
}
