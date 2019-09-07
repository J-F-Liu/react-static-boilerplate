import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { useState, useEffect } from "react";
import config from "../config";

const cache = new InMemoryCache();
const link = new HttpLink({ uri: config.graphqlServer, fetch });
const client = new ApolloClient({ cache, link });

export default function useGraphql(query, variables, depends = []) {
  // data, error, loading
  const [result, setResult] = useState([{}, null, true]);

  async function request() {
    try {
      const data = await client.query({
        query,
        variables,
        fetchPolicy: "network-only",
      });
      setResult([data, null, false]);
    } catch (error) {
      setResult([{}, error, false]);
    }
  }
  useEffect(() => {
    request();
  }, depends);

  return result;
}
