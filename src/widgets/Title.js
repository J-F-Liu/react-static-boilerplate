import React from "react";
import styled from "styled-components";

const Label = styled.label`
  position: relative;
  font-size: ${p => p.size}px;
  font-weight: bold;
  color: rgb(74, 74, 74);
  letter-spacing: 0.2px;
  z-index: 0;
  align-self: flex-start;
  .labelBg {
    position: absolute;
    width: ${p => p.shadow}px;
    height: 17px;
    z-index: -1;
    background: rgb(245, 213, 27);
    top: 55%;
    left: 50%;
    margin-left: -${p => p.shadow / 2}px;
  }
`;

const Title = ({ size = 24, shadow = 72, children }) => (
  <Label size={size} shadow={shadow}>
    {children}
    <div className="labelBg" />
  </Label>
);

export default Title;
