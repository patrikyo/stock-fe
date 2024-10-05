'use client'
import Style from "./page.module.css"
import StockOverview from "./components/StockOverview/StockOverview";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import stockList from "./data/stocks.json"

export default function Home() {
  // Använd useState för att hantera din stocks-array
  const [stocks, setStocks] = useState<string[]>([]);

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

  }, []); 

  return (
    <main className={Style.stockContentContainer}>
      <ul className={Style.stockOverviewList}>
        {stocks.map((ticker: string, index: number) => (
          <li key={index}>
            <StockOverview ticker={ticker} />
          </li>
        ))}
      </ul>

      <div className={Style.addStockLinkContainer}>
        <FontAwesomeIcon className={Style.addStockBtn} icon={faPlusCircle} />
        <Link href="/stock-list">Lägg till börsbolag</Link>
      </div>
    </main>
  );
}
