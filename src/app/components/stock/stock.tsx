"use client";
import Style from "./stock.module.css"
import Image from "next/image";
import stocks from "../../data/stocks.json"
import useFetch from "@/app/hooks/usefetch";
import { useEffect } from "react";

const AddStock = ({ticker})=> {
    const {data, loading, error, getStockInfo} = useFetch();

    const persistStock = (ticker: string)=> {
        localStorage.setItem(ticker, ticker);
    }

    useEffect(()=> {
        getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`);
    },[ticker, getStockInfo]);
    
    return (
        <div>
            {loading && <p>Laddar....</p>}
            {!loading && 
            <ul className={Style.stockList}>
                <li>
                    <h2 className={Style.stockHeader}>{data?.companyName}</h2>
                    <ul className={Style.stockList}>
                        <li><Image src={`/${ticker}.png`} className={Style.stockImage} width={100} height={100} alt="logo"></Image></li>
                        <li><button onClick={()=> persistStock(ticker)} >Lägg till aktie</button></li>
                    </ul>
                </li>
            </ul>
            }
        </div>
    );
};

export default AddStock;