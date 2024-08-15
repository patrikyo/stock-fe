import useFetch from "@/app/hooks/usefetch";
import { useEffect, useState } from "react";
import Style from "./StockOverview.module.css";
import IStockOverview from "../../interfaces/IStockOverview.interface";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

const StockOverview: React.FC<IStockOverview> = ({ticker})=> {
    const {data, loading, error, getStockInfo} = useFetch();
    const indicator = ()=> {
        if(data){
            if(data?.percentChange >= 0) {
                return <span className={Style.positiveIndicator}><FontAwesomeIcon icon={faChevronUp}/></span>
            } else {
                return <span className={Style.negativeIndicator}><FontAwesomeIcon icon={faChevronDown}/></span> 
            }
        }
    }

    useEffect(()=> {
      getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`);
    }, [data]);

    

    return(
        <>
            { loading && <p>Laddar...</p> }
            { (!loading && data) && <ul className={Style.stockDetailList}>            
                <li className={Style.stockListItem}><Image src={`/${ticker}.png`} width={100} height={80} alt="bolags loga" /></li>
                <li className={Style.stockListItem}>{data.companyName}</li>
                <li className={Style.stockListItem}>pris: {data.currentPrice} kr</li>
                <li className={Style.stockListItem}>{indicator()} {data.percentChange}%</li>
                <li className={Style.stockListItem}><button className={Style.dataFetchBtn} onClick={()=> getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`)}>hämta börsdata</button></li>
            </ul>
            }
        </>
    );
};

export default StockOverview;

