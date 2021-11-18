import styled from "styled-components";

const StyledFavorites = styled.div`
  display: flex;
  font-size: 0.7rem;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
  background-color: ${({ theme }) => theme.backgroundColor};

  & a {
    color: ${({ theme }) => theme.color};
  }
`;

export default StyledFavorites;
