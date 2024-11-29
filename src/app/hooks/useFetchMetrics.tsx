import { useEffect, useState } from "react";
import IStockMetricsProps from "../interfaces/IStockMetrics.interface";
import IStockMetrics from "../interfaces/IStockMetrics.interface";
// lägg till abort controler

const useFetchMetric = (ticker: string | null) => {
  const [data, setData] = useState<IStockMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}/metrics`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((error) => setError(true))
      .finally(() => setLoading(false));
  }, [ticker]);

  return { data, loading, error };
};

export default useFetchMetric;
