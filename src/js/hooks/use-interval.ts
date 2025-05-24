import { useEffect } from "react";

export const useInterval = (callback: () => void, ms: number) => {
  useEffect(() => {
    callback();

    const interval = setInterval(callback, ms);

    return () => clearInterval(interval);
  }, [callback, ms]);
};
