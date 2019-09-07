import React from "react";
import styled from "styled-components";
import Spinner from "react-spinner";
import "react-spinner/react-spinner.css";

const Loading = styled.div`
  width: 100%;
  height: 200px;
  .react-spinner {
    width: 120px;
    height: 100px;
    .react-spinner_bar {
      background-color: #607d8b;
    }
  }
`;

export default function({ children }) {
  return (
    <Loading>
      {children}
      <Spinner />
    </Loading>
  );
}
