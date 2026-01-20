import { useEffect, useState, useCallback, useRef } from "react";

interface FetchOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  cacheControl?: string;
}

export const useFetch = <T = any>(url: string, options: FetchOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { cacheControl = 'no-store' } = options;
  
  const onSuccessRef = useRef(options.onSuccess);
  const onErrorRef = useRef(options.onError);
  
  useEffect(() => {
    onSuccessRef.current = options.onSuccess;
    onErrorRef.current = options.onError;
  }, [options.onSuccess, options.onError]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        cache: cacheControl as RequestCache,
        headers: {
          'Cache-Control': cacheControl,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      onSuccessRef.current?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      onErrorRef.current?.(error);
    } finally {
      setLoading(false);
    }
  }, [url, cacheControl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
