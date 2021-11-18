import styled from "styled-components";

export const StyledDaily = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;

  & > div {
    border: 1px solid #ccc;
    padding: 1rem;
  }

  & > div > div {
    align-items: end;
    display: flex;
    gap: 5px;
    justify-content: center;
  }
`;

export default StyledDaily;
