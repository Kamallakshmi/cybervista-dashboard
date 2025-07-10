import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
console.log();
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetcher = <T = any>(endpoint: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(endpoint);
        if (!cancelled) {
          setData(res.data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return { data, loading, error };
};
