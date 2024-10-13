'use client'
import Style from "./page.module.css"
import StockOverview from "./components/StockOverview/StockOverview";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import stockList from "./data/stocks.json"
import { Spinner } from "react-bootstrap";

export default function Home() {
  const [stocks, setStocks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let tempStocks: string[] = [];

    // Hämta tickers från localStorage
    stockList.tickers.forEach((stock) => {
      const stockFromStorage = localStorage.getItem(stock);
      if (stockFromStorage) {
        tempStocks.push(stockFromStorage);  
      }
    });
    setStocks(tempStocks);
    setLoading(false);

  }, []); 

  return (
    <main className={Style.stockContentContainer}>
      {/*  Länk för att lägga till Aktiebolag */}
      <div className={Style.addStockContainer}>
        <Link className={Style.addStockLinkContainer} href="/stock-list">
          <FontAwesomeIcon className={Style.addStockBtn} icon={faPlusCircle} aria-hidden="true"/> 
          <span>Lägg till börsbolag</span>
        </Link>
      </div>

      { loading &&  <div className={Style.loadingIndicatorContainer}><Spinner className={Style.loadingIndicator}/></div>}
      
      { /*Lista på börsbolag man följer*/ }
      { !loading && <ul className={Style.stockOverviewList}>
        {stocks.map((ticker: string, index: number) => (
          <li key={index}>
            <StockOverview ticker={ticker} />
          </li>
        ))}
      </ul>
      }
    </main>
  );
}
