
const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(1)} B USD`; // Miljarder
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(1)} M USD`; // Miljoner
    }
    return `${num} USD`; // Mindre än en miljon, ingen omvandling
  };
  
  const formatMetric = (key: string, value: number | string) => {
    if (typeof value === "number") {
      switch (key) {
        case "enterpriseValue":
        case "marketCap":
          return formatNumber(value);
        default:
          return value.toFixed(2); // Runda av andra tal till två decimaler
      }
    }
    return value; // Returnera "N/A" eller andra strängvärden som de är
  };

  const translateMetric = (metric: string): string=> {
     switch(metric) {
      case "enterpriseValue": return "Företagsvärde ";
      case "enterpriseValueEbitda": return "EV/EBITDA ";
      case "enterpriseValueRevenue": return " EV/Intäkter";
      case "forwardPE": return " Framtida P/E";
      case "marketCap": return "Börsvärde";
      case "pbRatio": return "P/B";
      case "psRatio": return " P/S-tal";
      case "shortSelling": return "Blankning";
      default: return "";
    }

  } 
  export {formatNumber, formatMetric, translateMetric};


  