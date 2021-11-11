import styled from "styled-components";

export const StyledDaily = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;

  & > div {
    border: 1px solid #ccc;
    padding: 1rem;

    & :nth-child(2) {
      font-size: 0.5rem;
    }
  }
`;

export default StyledDaily;
