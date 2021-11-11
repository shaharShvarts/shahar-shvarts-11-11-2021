import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StyledFavoriteCard from "./StyledFavoriteCard";

const FavoriteCard = ({ favorite }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("01");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_KEY;
    const baseUrl = "http://dataservice.accuweather.com/";
    const currentConditions = "currentconditions/v1/";
    // console.log(favorite);
    const fetchData = async () => {
      const { data } = await axios(
        `${baseUrl}${currentConditions}${favorite.locationCode}?apikey=${apiKey}`
      );
      setState(data[0]);
      setWeatherIcon(
        data[0].WeatherIcon.toString().length === 2
          ? data[0].WeatherIcon
          : "0" + data[0].WeatherIcon
      );
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const showFavorite = (e) => {
    const locationCode = e.currentTarget.id;

    dispatch({
      type: "getWeatherByCity",
      payload: { cityName: favorite.cityName, locationCode },
    });
  };

  return (
    <StyledFavoriteCard
      id={favorite.locationCode}
      to="/"
      onClick={showFavorite}
    >
      <div>
        <h2>{favorite.cityName}</h2>
        <h2>{state?.Temperature?.Metric?.Value} ° c</h2>
      </div>
      <img
        src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}
        alt="Weather icon"
      />
      <p>{state?.WeatherText}</p>
    </StyledFavoriteCard>
  );
};

export default FavoriteCard;
