import { useState, useEffect } from "react";
import queryString from "query-string";

export default function useQuery() {
  const [query, setQuery] = useState(queryString.parse(location.search));
}
