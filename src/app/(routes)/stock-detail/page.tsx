'use client';  // Detta säkerställer att det är en Client Component

import Gauge from "@/app/components/Gauge/Gauge";
import Style from "./page.module.css";
import { useEffect } from "react";
import { useRouter, useSearchParams} from "next/navigation";
import useFetchMetric from "@/app/hooks/useFetchMetrics";
import Spinner from "react-bootstrap/esm/Spinner";
import IStockMetrics from "@/app/interfaces/IStockMetrics.interface";
import { formatMetric, translateMetric } from "@/app/utils/format";
import Link from "next/link";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StockDetail = () => {
  const searchParams = useSearchParams();
  const ticker: string | null = searchParams.get('ticker');
  const {data, loading, error} = useFetchMetric(ticker);

  const getMetricsList = (data: IStockMetrics | null) => {
    if (data) {
      const metricsList = (Object.keys(data) as (keyof IStockMetrics)[]).map((ele, i) => {
        if (data[ele] !== "N/A") {
          return <li key={i} className={Style.stockKeyMeteric}>{translateMetric(ele)}: <span className={Style.stockKeyMetericValue}>{formatMetric(ele, data[ele])}</span></li>;
        }
        return null; // Returnera null för "N/A"
      }).filter(item => item !== null); // Filtrera bort null-värden
  
      console.log(metricsList); // Debug-utskrift
      return metricsList;
    }
    return null;
  };
  

  return (
   <> 
    {loading && <div className={`${Style.mainContainer} ${Style.alignCenter}`}><Spinner className={Style.loadingIndicator}/></div>}
      
      { !loading && <main className={Style.mainContainer}>
          <section className={Style.stockDetailSection}>
            <h2 className={Style.stockDetailHeader}>Blankning: <span className={Style.stockShortValue}>{data?.shortSelling}</span></h2>
            <Gauge shortValue={data?.shortSelling}/>
          </section>

          <section className={Style.stockDetailSection}>
            <h2 className={Style.stockDetailHeader}>Nyckeltal</h2>
            <ul className={Style.stockKeyMetricsList}>
              {data && getMetricsList(data) }
            </ul>
          </section>
          <div className={Style.backLinkContainer}>
            <span><FontAwesomeIcon className={Style.backLinkIcon} icon={faChevronLeft}></FontAwesomeIcon> <Link className={Style.backLink} href="/">Tillbaka</Link></span>
          </div>
      </main>
    }
  </> 
  );
};

export default StockDetail;
