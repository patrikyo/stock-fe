import Style from "./StockInfo.module.css";

const StockInfo = ({companyName, currentPrice})=> {
    return (    
            <ul className={Style.stockInfoList}>
                <li>{companyName}</li>
                <li>{currentPrice}kr</li>
            </ul>
    );
};

export default StockInfo;