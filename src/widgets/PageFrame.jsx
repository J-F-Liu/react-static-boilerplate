import React from "react";
import styled from "styled-components";
import { Row, Col } from "../components/Flexbox";
import Loading from "./Loading";

const ActionBar = styled(Row)`
  background-color: #fff;
  padding: 16px 16px 0 16px;
  h4 {
    flex-grow: 1;
    margin: 0 16px 0 0;
    color: #999;
    font-weight: normal;
    font-size: 20px;
  }
  h4 > label {
    color: #333;
    margin: 0;
    font-size: 20px;
  }
`;

const Frame = styled(Col)`
  padding: 16px;
  width: 100%;
  p.error.newline {
    margin-left: 3em;
    margin-bottom: 0.8em;
  }
`;

const PageFrame = ({ title, category, actions, loading, children }) => (
  <Col>
    <ActionBar valign="middle">
      <h4>
        {category ? category + "/" : ""}
        <label>{title}</label>
      </h4>
      {actions}
    </ActionBar>
    <Frame>{loading ? <Loading /> : children}</Frame>
  </Col>
);

export default PageFrame;
