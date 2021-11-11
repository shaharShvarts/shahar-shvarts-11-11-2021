import { useEffect, useState } from "react";
import FavoriteCard from "../FavoriteCard";
import StyledFavorites from "./StyledFavorites";
// import FavoriteCard from "../FavoriteCard";

const FavoritesInfo = () => {
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    let allFavorites = JSON.parse(localStorage.getItem("allFavorites")) || [];
    setFavoritesList(allFavorites);
  }, []);

  return (
    <StyledFavorites>
      {favoritesList &&
        favoritesList.map((favorite) => (
          <FavoriteCard key={favorite.locationCode} favorite={favorite} />
        ))}
    </StyledFavorites>
  );
};

export default FavoritesInfo;
