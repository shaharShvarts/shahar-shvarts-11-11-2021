const geoposition = JSON.parse(localStorage.getItem("geoposition"));

const initialState = {
  cityName: geoposition?.cityName || "Tel Aviv",
  currentTemp: 0,
  locationCode: geoposition?.locationCode || "215854",
  weatherText: "",
  weatherIcon: "01",
};

const FavoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setWeatherByCity":
      return {
        ...state,
        cityName: action.payload.cityName,
        locationCode: action.payload.locationCode,
      };
    case "setCurrentTempByCity":
      return {
        ...state,
        currentTemp: action.payload.currentTemp,
        weatherText: action.payload.weatherText,
        weatherIcon: action.payload.weatherIcon,
      };
    default:
      return state;
  }
};

export default FavoritesReducer;
