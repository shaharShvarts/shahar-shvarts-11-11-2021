import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFavoriteCard = styled(Link)`
  padding: 0.5rem;
  border: 2px solid #ccc;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  width: 100px;
  justify-content: space-between;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
  }
`;

export default StyledFavoriteCard;
