import { useCallback, useEffect, useRef, useState } from "react";

export const useAsync = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();
  const [isPending, setIsPending] = useState(false);
  const cancelRef = useRef<() => void>();

  const execute = useCallback(async () => {
    cancelRef.current?.();

    setData(undefined);
    setError(undefined);
    setIsPending(true);

    let canceled = false;
    try {
      const response = await fn();
      if (!canceled) {
        setData(response);
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!canceled) {
        setData(undefined);
        setError(error);
        setIsPending(false);
      }
    }

    cancelRef.current = () => {
      canceled = true;
    };
  }, [fn]);

  useEffect(() => {
    return cancelRef.current;
  }, []);

  return { data, error, isPending, execute };
};
