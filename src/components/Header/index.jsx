import { useLocation } from "react-router-dom";
import { StyledHeader, Title, Nav, StyledLink } from "./StyledHeader";

const Header = () => {
  const location = useLocation();

  const active = {
    bg: "#51b7cb",
    color: "#ffffff",
  };

  return (
    <StyledHeader>
      <Title className="title">Herolo Weather Task</Title>
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
