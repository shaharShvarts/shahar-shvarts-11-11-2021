import Search from "../components/Search";
import WeatherInfo from "../components/WeatherInfo";
import { HomeWrap } from "../components/WeatherInfo/StyleWeatherInfo";

const Home = () => {
  return (
    <HomeWrap>
      <Search />
      <WeatherInfo />
    </HomeWrap>
  );
};

export default Home;
