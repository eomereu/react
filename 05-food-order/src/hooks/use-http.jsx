import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (config, applyData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(config.url, {
        method: config.method ? config.method : 'GET',
        headers: config.headers ? config.headers : {},
        body: config.body ? JSON.stringify(config.body) : null,
      });


      if (!response.ok) {
        throw new Error("Error!");
      }

      const data = await response.json();
      applyData(data);
    } catch (e) {
      setError("Error: " + e.message + "!" || "Something went wrong.");
      console.log("Error: " + e.message + "!" || "Something went wrong.");
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
