import styled from "styled-components";

export const HomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-wrap: wrap;
`;

export const WeatherWrap = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & p {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin: 80px 0;
  }
`;

export const WeatherHeader = styled.section`
  display: flex;
  align-items: center;

  & button {
    border: 0;
    background-color: #51b7cb;
    padding: 0.2rem 0.5rem;
    margin-left: 5px;
    box-shadow: 0 1px 1px #666;
    cursor: pointer;
  }
`;

export const WeatherNow = styled.div`
  display: flex;
  font-size: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-right: auto;

  & h2 {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
