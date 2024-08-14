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
            { !loading && <ul className={Style.stockDetailList}>            
                <li>{data && data.companyName}</li>
                <li>{data && data.currentPrice} kr</li>
                <li className={Style.stockDetailItem}><button className={Style.dataFetchBtn} onClick={()=> getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`)}>hämta börsdata</button></li>
            </ul>
            }
        </div>
    );
};

export default StockOverview;

