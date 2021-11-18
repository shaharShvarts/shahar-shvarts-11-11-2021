import styled from "styled-components";

const Body = styled.div`
  height: 100vh;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.backgroundColor};

  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

export default Body;
