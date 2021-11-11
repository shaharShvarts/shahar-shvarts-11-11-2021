import styled from "styled-components";

export const SearchBox = styled.div`
  display: flex;
  position: relative;
  align-self: center;
  align-items: center;

  & svg {
    position: absolute;
    left: 5px;
    cursor: pointer;
  }
`;

export const StyledSearch = styled.input`
  padding: 0.2rem 1.5rem;
  outline: none;
`;
