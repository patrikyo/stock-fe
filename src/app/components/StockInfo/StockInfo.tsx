import IStockInfoProps from "../../interfaces/IStockInfoProps.interface";
import Style from "./StockInfo.module.css";


const StockInfo: React.FC<IStockInfoProps> = ({companyName, currentPrice, getStockInfo})=> {
    return (    
            <ul className={Style.stockInfoList}>
                <li>{companyName}</li>
                <li>{currentPrice}kr</li>
                <li><button onClick={()=>getStockInfo("https://stock-api-dh8r.onrender.com/api/stock/SBB-B.ST")} >uppdatera</button></li>
            </ul>
    );
};

export default StockInfo;