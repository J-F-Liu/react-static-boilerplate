import { useState, useEffect } from "react";
import queryString from "query-string";
import { callApi } from "../utils/LeanCloud";

export default function useFetch(path, params, depend = []) {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);

  async function request() {
    const query = params ? "?" + queryString.stringify(params) : "";
    const result = await callApi("GET", path + query);
    setResult(result);
    setLoading(false);
  }
  useEffect(() => {
    request();
  }, depend);

  return [result, loading];
}
