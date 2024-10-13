"use client";
import Style from "./stock.module.css"
import Image from "next/image";
import stocks from "../../data/stocks.json"
import useFetch from "@/app/hooks/usefetch";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import IStockProp from "@/app/interfaces/IStockProp.interface";


const AddStock: React.FC<IStockProp> = ({ticker})=> {
    const {data, loading, error, getStockInfo} = useFetch();

    const persistStock = (ticker: string): void=> {
        localStorage.setItem(ticker, ticker);
    }

    useEffect(()=> {
        getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`);
    },[ticker, getStockInfo]);
    
    return (
        <div>
            {loading && <Spinner className={Style.loadingIndicator}/>}
            {!loading && 
            <ul className={Style.stockList}>
                <li>
                    <h2 className={Style.stockHeader}>{data?.companyName}</h2>
                    <ul className={Style.stockList}>
                        <li><Image src={`/${ticker}.png`} className={Style.stockImage} width={100} height={100} alt="logo"></Image></li>
                        <li><button className={Style.stockAddBtn} onClick={()=> persistStock(ticker)}><FontAwesomeIcon className={Style.addStockIcon} icon={faPlusCircle} aria-hidden="true"/><span className={Style.addStockCopy}>Lägg till aktie</span></button></li>
                    </ul>
                </li>
                <hr className={Style.stockDivider}/>
            </ul>
            }
        </div>
    );
};

export default AddStock;