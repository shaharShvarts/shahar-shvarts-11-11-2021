import axios from "axios";
import { useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchBox, StyledSearch } from "./StyledSearch";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [cities, setCities] = useState([]);
  const searchRef = useRef("");
  const citiesRef = useRef("");

  const notify = (err) => toast(err, { type: "info", theme: "dark" });

  // Typing in english only
  const handleTyping = (e) => {
    if (e.target.value.length === 0) {
      setInput("");
      return;
    }

    const validInput = /[a-zA-Z0-9- ]+$/.test(e.target.value);

    if (!validInput) {
      notify("English letters only");
      return;
    }

    setInput(e.target.value);

    dispatchFunction(searchRef.current.value);
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && dispatchFunction(e.target.value);
  };

  const handleClick = () => {
    for (let city of Array.from(citiesRef.current.options)) {
      if (city.value === searchRef.current.value) {
        dispatch({
          type: "setWeatherByCity",
          payload: {
            cityName: city.value,
            locationCode: city.dataset.id,
          },
        });

        break;
      }
    }
  };

  const dispatchFunction = async (city) => {
    if (!city) return;
    const apiKey = process.env.REACT_APP_KEY;
    const baseUrl = "https://dataservice.accuweather.com/";
    const autocomplete = "locations/v1/cities/autocomplete";

    try {
      const result = await axios(
        `${baseUrl}${autocomplete}?apikey=${apiKey}&q=${city}`
      );

      if (result.data.length === 0) {
        notify("No matching results found");
        return;
      }

      const citiesData = result.data.map((city) => {
        return {
          key: city.Key,
          localizedName: city.LocalizedName,
        };
      });

      setCities(citiesData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <SearchBox>
        <AiOutlineSearch onClick={handleClick} />
        <StyledSearch
          ref={searchRef}
          value={input}
          type="text"
          list="cities"
          onInput={handleTyping}
          onKeyPress={handleKeyPress}
          onChange={handleClick}
        />
        <datalist id="cities" ref={citiesRef}>
          {cities &&
            cities.map(({ localizedName, key }) => (
              <option key={key} value={localizedName} data-id={key}></option>
            ))}
        </datalist>
      </SearchBox>
    </>
  );
};

export default Search;
