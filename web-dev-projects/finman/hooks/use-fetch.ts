import { useState } from "react";
import { toast } from "sonner";

type FetchFunction<T, A extends any[]> = (...args: A) => Promise<T>;

const useFetch = <T, A extends any[]>(cb: FetchFunction<T, A>) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: A) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        toast.error(error.message);
      } else {
        const unknownError = new Error("An unknown error occurred");
        setError(unknownError);
        toast.error(unknownError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
