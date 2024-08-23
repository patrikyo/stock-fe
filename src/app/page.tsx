'use client'
import Style from "./page.module.css"
import StockOverview from "./components/StockOverview/StockOverview";

export default function Home() {

  return (
    <main className={Style.stockContent}>
      <ul className={Style.stockOverviewList}>
         <li><StockOverview ticker="SBB-B.ST"/></li> 
         <li><StockOverview ticker="SBB-D.ST"/></li> 
         <li><StockOverview ticker="NEOBO.ST"/></li> 
         <li><StockOverview ticker="NIBE-B.ST"/></li> 
         <li><StockOverview ticker="EVO.ST"/></li> 
      </ul>
    </main>
  );
}


