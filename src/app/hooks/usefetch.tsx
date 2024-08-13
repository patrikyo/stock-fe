'use client'
import { useEffect, useState } from "react";
import IStock from "../interfaces/IStock.interface";

const useFetch = ()=> {
    const [data, setData] = useState<IStock | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getStockInfo = (url: string)=> {
        fetch(url).
        then((resp)=> { 
            if(!resp.ok) {
                throw true;
            } else {
                return resp.json();
            }
        })
        .then((res)=> setData(res))
        .catch((err)=> setError(err)).
        finally(()=>setLoading(false));
    }


    
    return {data, loading, error, getStockInfo};
    
};

export default useFetch;