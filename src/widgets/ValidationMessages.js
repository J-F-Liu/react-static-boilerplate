import React from "react";
import styled from "styled-components";
import _ from "lodash";

const Panel = styled.div`
  margin-top: 5px;
  min-height: 55px;
`;

const List = styled.ul`
  border: 1px solid rgba(252, 67, 67, 0.3);
  background: rgba(252, 67, 67, 0.03);
  border-radius: 8px;
  font-size: 12px;
  color: #fd4343;
  list-style-type: none;
  margin: 0;
  padding: 5px;
  width: 210px;
  img {
    width: 8px;
    height: 8px;
    margin: 0 8px;
  }
`;

const ValidationMessages = ({ messages, icon, ...other }) => {
  return (
    <Panel>
      {!_.isEmpty(messages) && (
        <List {...other}>
          {_.map(messages, (item, field) => (
            <li key={field}>
              {icon}
              {item.message}
            </li>
          ))}
        </List>
      )}
    </Panel>
  );
};

export default ValidationMessages;
