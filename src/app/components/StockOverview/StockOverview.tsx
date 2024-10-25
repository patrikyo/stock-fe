import useFetch from "@/app/hooks/usefetch";
import { useEffect, useState } from "react";
import Style from "./StockOverview.module.css";
import IStockOverview from "../../interfaces/IStockOverview.interface";
import Image from "next/image";
import { Spinner} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logo from "../Logo/logo";

const StockOverview: React.FC<IStockOverview> = ({ticker})=> {
    const {data, loading, error, getStockInfo} = useFetch();
    const [initialLoad, setInitialLoad] = useState(true);

    const indicator = ()=> {
        if(data){
            if(data?.percentChange >= 0) {
                return <span className={Style.positiveIndicator}><FontAwesomeIcon icon={faChevronUp}/></span>
            } else {
                return <span className={Style.negativeIndicator}><FontAwesomeIcon icon={faChevronDown}/></span> 
            }
        }
    }

    const loadingIndicator = ()=> {
        console.log("laoding", loading);
        if(loading) {
           return(
           <span className={Style.loadingContainerShow}>
              {  loading && <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                />
              }
           </span>);
        } else {
            return(
            <span className={Style.loadingContainerHide}>
                { <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                }
            </span>
            );
        }
    };

    useEffect(()=> {
       getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`);
    //   getStockInfo(`http://127.0.0.1:5000/api/stock/${ticker}`);
    }, [ticker, getStockInfo]);

    
//<Spinner className={Style.loadingIndicator}/>
    return(
        <>
         { (loading && initialLoad) && 
            <div className={Style.skeletonLoader}>
                <div className={Style.skeletonImage}></div>
                <div className={Style.skeletonTitle}></div>
                <div className={Style.skeletonPrice}></div> 
                <div className={Style.skeletonProcentage}></div>
                <div className={Style.skeletonUpdateTime}></div>
                <div className={Style.skeletonBtn}></div>
                <div className={Style.skeletonLink}></div>
            </div>}
         { (data) && 
            <ul className={Style.stockDetailList}>            
                <li className={Style.stockListItem}><Logo ticker={ticker}/></li>
                <li className={Style.stockListItem}>{data.companyName}</li>
                <li className={Style.stockListItem}>pris: {data.currentPrice} kr</li>
                <li className={Style.stockListItem}>{indicator()} {data.percentChange}%</li>
               { !data.lastUpdated.includes("00:00:00") && <li className={Style.stockListItem}><span className={Style.stockTimeStamp}>hämtades: {data.lastUpdated}</span></li> }
               <li className={Style.stockListItem}>
                <button className={Style.stockDataFetchBtn} onClick={()=>{ setInitialLoad(false); getStockInfo(`https://stock-api-dh8r.onrender.com/api/stock/${ticker}`)}}> 
                    {loadingIndicator()}
                    <span className={Style.stockDataFetchBtnText}>Uppdatera</span>
                </button>
              </li>
              <li className={Style.stockListItem}>
                <Link className={Style.stockLink} href={`/stock-detail?ticker=${ticker}`}>
                    <span className={Style.stockLinkText}>Detalj vy</span> 
                    <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon> 
                    </Link>
                </li>
            </ul>
            }
        </>
    );
};

export default StockOverview;