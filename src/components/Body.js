import styled from "styled-components";

const Body = styled.div`
  height: 100vh;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export default Body;
