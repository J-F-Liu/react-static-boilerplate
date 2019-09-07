import React from "react";
import { Tooltip } from "antd";

function textWidth(text) {
  const wchars = text.match(/[^\x00-\xff]/gi);
  return text.length + (wchars ? wchars.length : 0);
}

function clampText(text, width) {
  let total = 0;
  let index = 0;
  while (index < text.length && total < width) {
    total += text.codePointAt(index) > 255 ? 2 : 1;
    index += 1;
  }
  return text.substring(0, index);
}

export default function({ children, width }) {
  const text = children;
  if (textWidth(text) < width) {
    return text;
  } else {
    return (
      <Tooltip placement="topLeft" title={text}>
        <span>{clampText(text, width - 3)}...</span>
      </Tooltip>
    );
  }
}
