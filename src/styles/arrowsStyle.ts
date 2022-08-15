import styled, { keyframes } from "styled-components";

const arrowHourRotate = (degree: number) => keyframes`
  from {transform: rotate(${180 + degree}deg)}
  to {transform: rotate(${540 + degree}deg)} 
`;
const arrowMinuteRotate = (degree: number) => keyframes`
  from {transform: rotate(${180 + degree}deg)}
  to {transform: rotate(${540 + degree}deg)} 
`;
const arrowSecondRotate = (degree: number) => keyframes`
  from {transform: rotate(${180 + degree}deg)}
  to {transform: rotate(${540 + degree}deg)} 
`;

const ArrowHour = styled.span<{ degree: number }>`
  animation: ${(props) => arrowHourRotate(props.degree)} 43200s linear infinite;
`;
const ArrowMinute = styled.span<{ degree: number }>`
  animation: ${(props) => arrowMinuteRotate(props.degree)} 3600s linear infinite;
`;
const ArrowSecond = styled.span<{ degree: number }>`
  animation: ${(props) => arrowSecondRotate(props.degree)} 60s linear infinite;
`;

export { ArrowHour, ArrowMinute, ArrowSecond };
