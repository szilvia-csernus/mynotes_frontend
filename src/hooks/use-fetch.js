import { useCallback, useState } from "react";

function useFetch(requestFunction, startWithPending = false) {
  const [httpState, setHttpState] = useState({
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      setHttpState({
        data: null,
        error: null,
        status: "pending",
      });
      try {
        const responseData = await requestFunction(requestData);
        setHttpState({
          data: responseData,
          error: null,
          status: "completed",
        });
      } catch (errorMessage) {
        setHttpState({
          data: null,
          error: errorMessage,
          status: "completed",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useFetch;
