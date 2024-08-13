interface IStockInfoProps {
    companyName: string;
    currentPrice: string;
    getStockInfo: (url: string)=> void;

};

export default IStockInfoProps;


