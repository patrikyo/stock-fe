'use client';

import { useEffect, useRef } from "react";
import IGauge from "../../interfaces/IGauge.interface";
import Style from "./Gauge.module.css";

const Gauge: React.FC<IGauge> = ({ shortValue }) => {
    const shortValueFloat = parseFloat(shortValue.replace(",", "."));
    const maxValue = 100; // Maxvärdet är nu 100

    const gaugeRef = useRef<HTMLDivElement>(null);
    const gaugeFillRef = useRef<HTMLDivElement>(null);
    const gaugeCoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gaugeFillRef.current) {
            // Sätt mätaren till 0 grader när sidan laddas (utan animation)
            gaugeFillRef.current.style.transition = 'none'; // Stäng av transition
            gaugeFillRef.current.style.transform = `rotate(0deg)`; // Sätt till 0 grader

            // Vänta lite för att ge DOM tid att uppdatera
            setTimeout(() => {
                if (gaugeFillRef.current) {
                    // Efter den initiala reset, animera från 0 till aktuellt värde
                    gaugeFillRef.current.style.transition = 'transform 1s ease-out'; // Lägg till transition
                    const rotation = (shortValueFloat / maxValue) * 180; // 180° max rotation
                    gaugeFillRef.current.style.transform = `rotate(${rotation}deg)`; // Roterar till rätt värde
                }
            }, 50); // 50ms timeout för att ge DOM tid att nollställa
        }

        if (gaugeCoverRef.current) {
            gaugeCoverRef.current.textContent = `${shortValueFloat}%`; // Visa värdet
        }
    }, [shortValueFloat]);

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
