import styled from "styled-components";

export const StyledDaily = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

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
