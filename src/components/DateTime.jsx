import React from "react";
import formatTime from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default function DateTime({ value, lines = 2, format = "yyyy-MM-dd HH:mm:ss", ...props }) {
  const time = typeof value === "string" ? value : typeof value === "object" ? value.iso : null;
  if (time) {
    const text = formatTime(parseISO(time), format);
    if (lines == 2) {
      const items = text.split(" ");
      return (
        <span {...props}>
          {items[0]}
          <br />
          {items[1]}
        </span>
      );
    } else {
      return <span {...props}>{text}</span>;
    }
  }
  return null;
}
