import { useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchBox, StyledSearch } from "./StyledSearch";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const searchRef = useRef("");
  const notify = (err) => toast(err, { type: "info", theme: "dark" });
  // Typing in english only
  const handleTyping = (e) => {
    const input = e.target.value;
    setInput(input.replace(/[^A-Za-z\s]/g, "*"));
  };

  const handleClick = () => {
    dispatchFunction(searchRef.current.value);
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && dispatchFunction(e.target.value);
  };

  const dispatchFunction = async (city) => {
    if (!city) return;
    const apiKey = process.env.REACT_APP_KEY;
    const baseUrl = "http://dataservice.accuweather.com/";
    const autocomplete = "locations/v1/cities/autocomplete";
    const { data } = await axios(
      `${baseUrl}${autocomplete}?apikey=${apiKey}&q=${city}`
    );

    if (data.length === 0) {
      notify("No matching results found");
      return;
    }

    dispatch({
      type: "getWeatherByCity",
      payload: { cityName: data[0].LocalizedName, locationCode: data[0].Key },
    });
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
          onInput={handleTyping}
          onKeyPress={handleKeyPress}
        />
      </SearchBox>
    </>
  );
};

export default Search;
