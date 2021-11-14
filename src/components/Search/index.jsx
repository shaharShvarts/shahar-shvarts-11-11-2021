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
  const searchRef = useRef("");
  // const cars = useRef("");

  const notify = (err) => toast(err, { type: "info", theme: "dark" });

  // Typing in english only
  const handleTyping = (e) => {
    if (e.target.value.length === 0) {
      setInput("");
      return;
    }

    const validInput = /[a-zA-Z]+$/.test(e.target.value);

    if (!validInput) {
      notify("English letters only");
      return;
    }
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && dispatchFunction(e.target.value);
  };

  const handleClick = () => {
    dispatchFunction(searchRef.current.value);
  };

  const dispatchFunction = async (city) => {
    if (!city) return;
    const apiKey = process.env.REACT_APP_KEY;
    const baseUrl = "https://dataservice.accuweather.com/";
    const autocomplete = "locations/v1/cities/autocomplete";
    let result;
    try {
      result = await axios(
        `${baseUrl}${autocomplete}?apikey=${apiKey}&q=${city}`
      );

      if (result.data.length === 0) {
        notify("No matching results found");
        return;
      }

      dispatch({
        type: "getWeatherByCity",
        payload: {
          cityName: result.data[0].LocalizedName,
          locationCode: result.data[0].Key,
        },
      });
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
          onInput={handleTyping}
          onKeyPress={handleKeyPress}
        />
      </SearchBox>
    </>
  );
};

export default Search;
