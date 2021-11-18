import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkMode, lightMode } from "./theme";
import Header from "./components/Header";
import { useState } from "react";
import Home from "./pages/Home";
import Body from "./components/Body";
import Favorites from "./pages/Favorites";
import Container from "./components/Container";

import "./App.css";

const themes = {
  light: lightMode,
  dark: darkMode,
};

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={themes[theme]}>
      <Body>
        <Header setTheme={setTheme} />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Container>
      </Body>
    </ThemeProvider>
  );
}

export default App;
