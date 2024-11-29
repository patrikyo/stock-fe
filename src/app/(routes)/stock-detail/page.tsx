"use client";

import Gauge from "@/app/components/Gauge/Gauge";
import Style from "./page.module.css";
import { useSearchParams } from "next/navigation";
import useFetchMetric from "@/app/hooks/useFetchMetrics";
import IStockMetrics from "@/app/interfaces/IStockMetrics.interface";
import { formatMetric, translateMetric } from "@/app/utils/format";
import Link from "next/link";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";

const SkeletonLoader = () => (
  <>
    <div className={Style.skelotonHeaderOne}></div>
    <div className={Style.skeletonGauge}></div>
    <div className={Style.skeletonHeaderTwo}></div>
    <ul className={Style.skeletonList}>
      {[...Array(8)].map((_, i) => (
        <li key={i} className={Style.skeletonStockKeyMetricsList}>
          <span className={Style.skeletonStockKeyMeteric}></span>
          <span className={Style.skeletonStockKeyMetericValue}></span>
        </li>
      ))}
    </ul>
    <div className={Style.skeletonBackLinkIcon}></div>
    <div className={Style.skeletonBackLink}></div>
  </>
);

const StockDetailContent = () => {
  const searchParams = useSearchParams();
  const ticker: string | null = searchParams.get("ticker");
  const { data, loading, error } = useFetchMetric(ticker);

  const getMetricsList = (data: IStockMetrics | null) => {
    if (data) {
      const metricsList = (Object.keys(data) as (keyof IStockMetrics)[])
        .map((ele, i) => {
          if (data[ele] !== "N/A") {
            return (
              <li key={i} className={Style.stockKeyMeteric}>
                {translateMetric(ele)}:{" "}
                <span className={Style.stockKeyMetericValue}>
                  {formatMetric(ele, data[ele])}
                </span>
              </li>
            );
          }
          return null;
        })
        .filter((item) => item !== null);

      return metricsList;
    }
    return null;
  };

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        data && (
          <>
            <section className={Style.stockDetailSection}>
              <h2 className={Style.stockDetailHeader}>
                Blankning:{" "}
                <span className={Style.stockShortValue}>
                  {data?.shortSelling}%
                </span>
              </h2>
              <Gauge shortValue={data?.shortSelling || "0"} />
            </section>
            <section className={Style.stockDetailSection}>
              <h2 className={Style.stockDetailHeader}>Nyckeltal</h2>
              <ul className={Style.stockKeyMetricsList}>
                {getMetricsList(data)}
              </ul>
            </section>
            <div className={Style.backLinkContainer}>
              <FontAwesomeIcon
                className={Style.backLinkIcon}
                icon={faChevronLeft}
              />
              <Link className={Style.backLink} href="/">
                Tillbaka
              </Link>
            </div>
          </>
        )
      )}
    </>
  );
};

const StockDetail = () => {
  return (
    <main className={Style.mainContainer}>
      <Suspense fallback={<SkeletonLoader />}>
        <StockDetailContent />
      </Suspense>
    </main>
  );
};

export default StockDetail;
