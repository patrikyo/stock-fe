import useFetch from "@/app/hooks/usefetch";
import { useEffect } from "react";
import Style from "./StockOverview.module.css";
import IStockOverview from "../../interfaces/IStockOverview.interface";

const StockOverview: React.FC<IStockOverview> = ({ticker})=> {
    const {data, loading, error, getStockInfo} = useFetch();
    useEffect(()=> {
      getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`);
    }, []);

    return(
        <div>
            { loading && <p>Laddar...</p> }
            { (!loading && data) && <ul className={Style.stockDetailList}>            
                <li>{data.companyName}</li>
                <li>pris: {data.currentPrice} kr</li>
                <li>procent: {data.percentChange}%</li>
                <li><button className={Style.dataFetchBtn} onClick={()=> getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`)}>hämta börsdata</button></li>
            </ul>
            }
        </div>
    );
};

export default StockOverview;

