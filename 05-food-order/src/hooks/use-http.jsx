import React, { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (config, applyData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch({
        url: config.url,
        method: config.method ? config.method : "GET",
        body: config.body ? JSON.stringify(config.body) : {},
        headers: config.headers ? config.headers : null,
      });

      if (!response.ok) {
        throw new Error("Error! Status Code: " + response.status);
      }

      const data = await response.json();
      applyData(data);
    } catch (e) {
      setError(e.message || "Something went wrong.");
      console.log(e.message || "Something went wrong.");
    }

    setLoading(false);
  }, []);

  return {
    loading,
    error,
    sendRequest,
  };
};

export default useHttp;