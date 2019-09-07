import React from "react";
import { Redirect } from "@reach/router";
import { useAccount } from "../SharedState";
import Layout from "../widgets/Layout";

export default () => {
  const account = useAccount();
  return <Layout>工作台</Layout>;
};
