import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StyledDaily from "./StyledDaily";

const Daily = () => {
  const { locationCode } = useSelector((state) => state);
  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_KEY;
    const baseUrl = "http://dataservice.accuweather.com/";
    const daily5Day = "forecasts/v1/daily/5day/";

    const fetchData = async () => {
      const { data } = await axios(
        `${baseUrl}${daily5Day}${locationCode}?apikey=${apiKey}&metric=true`
      );

      setDailyForecasts(data.DailyForecasts);
    };

    fetchData();
  }, [locationCode]);

  return (
    <StyledDaily>
      {dailyForecasts &&
        dailyForecasts.map((day, index) => (
          <div key={index}>
            <div>
              {new Date(day.Date).toLocaleDateString("en-us", {
                weekday: "short",
              })}
            </div>
            <div>{day.Temperature.Maximum.Value}° c</div>
          </div>
        ))}
    </StyledDaily>
  );
};

export default Daily;
