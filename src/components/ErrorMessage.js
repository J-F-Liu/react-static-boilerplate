import React from "react";
import styled from "styled-components";
import _ from "lodash";

const Message = styled.span`
  display: inline-block;
  margin-left: 0.5em;
  color: red;
`;

export default ({ errors, name }) => {
  const error = _.find(errors, item => item.param == name);
  return error ? <Message>{error.message}</Message> : null;
};
