import React from "react";
import styled from "styled-components";
import { Col } from "../components/Flexbox";

const Background = styled(Col)`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export default function Dimmer({ active, children, ...other }) {
  return active ? (
    <Background align="center" valign="middle" {...other}>
      {children}
    </Background>
  ) : null;
}
