'use client'
import { useEffect } from "react";
import StockInfo from "./components/StockInfo/StockInfo";
import useFetch from "./hooks/usefetch";
import Style from "./page.module.css"

export default function Home() {
    const {data, loading, error, getStockInfo} = useFetch();
    useEffect(()=> {
      getStockInfo("https://stock-api-dh8r.onrender.com/api/stock/SBB-B.ST");
    }, []);


  return (
    <main className={Style.mainContent}>
      <h1>börsdata</h1>
       { data && <StockInfo companyName={data?.companyName} currentPrice={data?.currentPrice} getStockInfo={getStockInfo}/> }
    </main>
  );
}


