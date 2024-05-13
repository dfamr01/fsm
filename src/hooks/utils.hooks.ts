import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchData = (url: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState({});

  useEffect(() => {
    setIsFetching(true);
    axios
      .get(url)
      .then(function (response) {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [url]);

  return [isFetching, data, error];
};
