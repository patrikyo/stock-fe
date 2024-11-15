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
import Logo from "../Logo/logo";


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
            {loading && 
                <>
                    <div className={Style.skeletonHeader}></div>
                    <div className={Style.skeletonImage}></div>
                    <div className={Style.skeletonBtn}></div>
                    <div className={Style.skeletonDivider}></div>
                </>
            }
            {!loading && 
            <ul className={Style.stockListContainer}>
                <li>
                    <h2 className={Style.stockHeader}>{data?.companyName}</h2>
                    <ul className={Style.stockList}>
                    <li className={Style.stockListItem}><Logo ticker={ticker}/></li>
                        <li>
                            <button className={Style.addStockContainer} onClick={()=> persistStock(ticker)}>
                                <FontAwesomeIcon className={Style.addStockBtn} icon={faPlusCircle} aria-hidden="true"/> 
                                <span>Lägg till bolag</span>
                            </button>
                        </li>
                    
                    </ul>
                </li>
                <hr className={Style.stockDivider}/>
            </ul>
            }
        </div>
    );
};

export default AddStock;