'use client'

import Image from "next/image";
import styles from "./page.module.css";
import useFetch from "./hooks/usefetch";

export default function Home() {
    const {data, loading, error} = useFetch("https://stock-api-dh8r.onrender.com/api/stock/SBB-B.ST");


  return (
    <main>
      <h1>börsdata</h1>
      {data && data.companyName}
      {data && data.currentPrice}kr
    </main>
  );
}


