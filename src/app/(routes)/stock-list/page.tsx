"use client";
import Style from "./page.module.css";
import stocks from "../../data/stocks.json"
import StockOverview from "@/app/components/StockOverview/StockOverview";
import Stock from "@/app/components/stock/stock";

const StockList = ()=> {
    return(
        <main className={Style.mainContainer}>
           <ul className={Style.stockList}>
                { stocks.tickers.map((ticker, index)=> <li key={index}><Stock ticker={ticker}/></li>) }
           </ul>
        </main>
    );
};

export default StockList;