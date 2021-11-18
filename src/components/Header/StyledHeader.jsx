import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  border-bottom: 1px solid #555;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    gap: 20px;
    flex-direction: column;
  }
`;

export const Title = styled.p`
  font-weight: 700;
`;

export const Controllers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
`;

export const Nav = styled.nav`
  display: flex;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;
  border: 1px solid #333;
  padding: 0.3rem 0.6rem;
  background-color: ${({ active: { bg } }) => bg};
  color: ${({ active: { color } }) => color};
`;
