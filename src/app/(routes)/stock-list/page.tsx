"use client";
import Style from "./page.module.css";
import stocks from "../../data/stocks.json";
import StockOverview from "@/app/components/StockOverview/StockOverview";
import Stock from "@/app/components/stock/stock";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const StockList = () => {
  return (
    <main className={Style.mainContainer}>
      <ul className={Style.stockList}>
        {stocks.tickers.map((ticker, index) => (
          <li key={index}>
            <Stock ticker={ticker} />
          </li>
        ))}
      </ul>
      <div className={Style.backLinkContainer}>
        <FontAwesomeIcon className={Style.backLinkIcon} icon={faChevronLeft} />
        <Link className={Style.backLink} href="/">
          Tillbaka
        </Link>
      </div>
    </main>
  );
};

export default StockList;
