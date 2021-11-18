import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTheme } from "styled-components";
import { CgSun } from "react-icons/cg";
import { BsMoonStarsFill, BsGeoAlt } from "react-icons/bs";
import { StyledHeader, Title, Nav, StyledLink } from "./StyledHeader";

import axios from "axios";

const Header = ({ setTheme }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.backgroundColor === "#000";

  const active = {
    bg: "#51b7cb",
    color: "#ffffff",
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const toggleTheme = () => {
    isDark ? setTheme("light") : setTheme("dark");
  };

  const darkMode = isDark ? (
    <CgSun onClick={toggleTheme} />
  ) : (
    <BsMoonStarsFill onClick={toggleTheme} />
  );

  const setGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const latitude = `${coords.latitude}`;
        const longitude = `${coords.longitude}`;
        const apiKey = process.env.REACT_APP_KEY;
        const baseUrl = "https://dataservice.accuweather.com/";
        const geoposition = "locations/v1/cities/geoposition/search";

        try {
          const { data } = await axios(
            `${baseUrl}${geoposition}?apikey=${apiKey}&q=${latitude},${longitude}`
          );

          localStorage.setItem(
            "geoposition",
            JSON.stringify({
              cityName: data.LocalizedName,
              locationCode: data.Key,
            })
          );

          dispatch({
            type: "setWeatherByCity",
            payload: {
              cityName: data.LocalizedName,
              locationCode: data.Key,
            },
          });
        } catch (error) {
          console.log(error.message);
        }
      },
      ({ err }) => console.warn(`ERROR(${err.code}): ${err.message}`),
      options
    );
  };

  return (
    <StyledHeader>
      <Title className="title">Herolo Weather Task</Title>
      <BsGeoAlt onClick={setGeolocation} />
      {darkMode}
      <Nav>
        <StyledLink
          to="/"
          name="home"
          active={location.pathname === "/" ? active : ""}
        >
          Home
        </StyledLink>
        <StyledLink
          to="/favorites"
          name="favorites"
          active={location.pathname === "/favorites" ? active : ""}
        >
          Favorites
        </StyledLink>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
