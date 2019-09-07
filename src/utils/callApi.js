import config from "../config";
import fetch from "node-fetch";

export default async function callApi(path, data) {
  const options = data
    ? {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        credentials: "include",
      }
    : {
        headers: { Accept: "application/json" },
      };
  const url = path.startsWith("http") ? path : config.apiServer + path;
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
}
