'use client';

import { useEffect, useRef } from "react";
import Style from "./Gauge.module.css"

const Gauge = ({shortValue}) => {
    console.log("initial value", shortValue);
    shortValue = parseFloat(shortValue.replace(",", "."));
    console.log("shortValue", shortValue);
    const maxValue = 100;  // Maxvärdet är nu 100
    
    const gaugeRef = useRef<HTMLDivElement>(null);
    const gaugeFillRef = useRef<HTMLDivElement>(null);
    const gaugeCoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gaugeRef.current && shortValue >= 0 && shortValue <= maxValue) {
            // Justera rotation baserat på en skala från 0 till 100
            const rotation = (shortValue / maxValue) * 180;  // 180° max rotation
            if (gaugeFillRef.current) {
                gaugeFillRef.current.style.transform = `rotate(${rotation}deg)`;  // Använd grader
            }

            if (gaugeCoverRef.current) {
                gaugeCoverRef.current.textContent = `${shortValue}%`;  // Visa värdet 14.5
            }
        }
    }, [shortValue]);

    return (
        <div ref={gaugeRef} className={Style.gauge}>
            <div className={Style.gaugeBody}>
                <div ref={gaugeFillRef} className={Style.gaugeFill}></div>
                <div ref={gaugeCoverRef} className={Style.gaugeCover}></div>
            </div>
        </div>
    );
};

export default Gauge;
