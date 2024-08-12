'use client'
import { useEffect, useState } from "react";
import IStock from "../interfaces/IStock.interface";

const useFetch = (url: string)=> {
    const [data, setData] = useState<IStock | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const apiKey = "38846cee4dmsh19e1f4ec41e92c4p14c302jsn3ef16b1bcf18"

    useEffect(()=>{
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
    }, [url]);

    
    return {data, loading, error};
    
};

export default useFetch;