import useFetch from "@/app/hooks/usefetch";
import { useEffect } from "react";
import Style from "./StockOverview.module.css";
import IStockOverview from "../../interfaces/IStockOverview.interface";
import Image from "next/image";

const StockOverview: React.FC<IStockOverview> = ({ticker})=> {
    const {data, loading, error, getStockInfo} = useFetch();
    useEffect(()=> {
      getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`);
    }, []);

    return(
        <>
            { loading && <p>Laddar...</p> }
            { (!loading && data) && <ul className={Style.stockDetailList}>            
                <li className={Style.stockListItem}><Image src={`/${ticker}.png`} width={100} height={80} alt="bolags loga" /></li>
                <li className={Style.stockListItem}>{data.companyName}</li>
                <li className={Style.stockListItem}>pris: {data.currentPrice} kr</li>
                <li className={Style.stockListItem}>procent: {data.percentChange}%</li>
                <li className={Style.stockListItem}><button className={Style.dataFetchBtn} onClick={()=> getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`)}>hämta börsdata</button></li>
            </ul>
            }
        </>
    );
};

export default StockOverview;

