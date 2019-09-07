import React, { useState } from "react";
import { Button } from "antd";
import useTimer from "../hooks/useTimer";

export default function CountdownButton({ children, seconds, onClick, enabled = true, ...other }) {
  const [disabled, setDisabled] = useState(false); //由是否在倒计时决定
  const [remainSeconds, setSeconds] = useState(seconds);
  const [interval, setInterval] = useState(null);

  useTimer(() => {
    if (remainSeconds > 1) {
      setSeconds(remainSeconds - 1);
    } else {
      setInterval(null);
      setDisabled(false);
      setSeconds(seconds);
    }
  }, interval);

  async function handleClick() {
    const success = await onClick();
    if (success) {
      setInterval(1000);
      setDisabled(true);
    }
  }

  const content = disabled ? `${remainSeconds}s` : children;
  return (
    <Button disabled={!enabled || disabled} onClick={handleClick} {...other}>
      {content}
    </Button>
  );
}
