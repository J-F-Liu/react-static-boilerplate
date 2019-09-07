import React from "react";
import { Redirect } from "@reach/router";
import { useAccount } from "../SharedState";

export default () => {
  const account = useAccount();
  if (account != null) {
    return <Redirect to="/dashboard" noThrow />;
  } else {
    return <Redirect to="/login" noThrow />;
  }
};
