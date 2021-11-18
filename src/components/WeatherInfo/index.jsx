import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { WeatherWrap, WeatherHeader, WeatherNow } from "./StyleWeatherInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RiCelsiusLine } from "react-icons/ri";
import axios from "axios";
import Daily from "../Daily";

const WeatherInfo = () => {
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();

  const { locationCode, currentTemp, cityName, weatherText, weatherIcon } =
    useSelector((state) => state);
  const isFavorite = favorites.some(
    (favorite) => favorite.locationCode === locationCode
  );

  const addToFavorite = () => {
    if (isFavorite) return;
    setFavorites((prev) => [...prev, { locationCode, cityName }]);

    let existingFavorites =
      JSON.parse(localStorage.getItem("allFavorites")) || [];
    existingFavorites.push({ locationCode, cityName });
    localStorage.setItem("allFavorites", JSON.stringify(existingFavorites));
  };

  const removeFromFavorite = () => {
    const newFavorite = favorites.filter(
      (item) => item.locationCode !== locationCode
    );
    setFavorites(newFavorite);
    localStorage.setItem("allFavorites", JSON.stringify(newFavorite));
  };

  useEffect(() => {
    let existingFavorites =
      JSON.parse(localStorage.getItem("allFavorites")) || [];
    setFavorites(existingFavorites);

    const apiKey = process.env.REACT_APP_KEY;
    const baseUrl = "https://dataservice.accuweather.com/";
    const currentConditions = "currentconditions/v1/";

    const fetchData = async () => {
      const { data } = await axios(
        `${baseUrl}${currentConditions}${locationCode}?apikey=${apiKey}`
      );

      dispatch({
        type: "setCurrentTempByCity",
        payload: {
          currentTemp: data[0].Temperature.Metric.Value,
          weatherText: data[0].WeatherText,
          weatherIcon:
            data[0].WeatherIcon.toString().length === 2
              ? data[0].WeatherIcon
              : "0" + data[0].WeatherIcon,
        },
      });
    };

    fetchData();
  }, [locationCode, dispatch]);

  return (
    <WeatherWrap>
      <WeatherHeader>
        <WeatherNow>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}
            alt="Weather icon"
          />
          <div>
            <h2>{cityName}</h2>
            <h2>
              {currentTemp} {<RiCelsiusLine />}
            </h2>
          </div>
        </WeatherNow>
        {favorites && isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}

        <button
          onClick={favorites && isFavorite ? removeFromFavorite : addToFavorite}
        >
          {favorites && isFavorite
            ? "Remove from Favorites"
            : "Add To Favorite"}
        </button>
      </WeatherHeader>
      <p>{weatherText}</p>
      <Daily />
    </WeatherWrap>
  );
};

export default WeatherInfo;
