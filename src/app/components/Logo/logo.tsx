import ILogo from "@/app/interfaces/ILogo.interface";
import Style from "./logo.module.css";
import Image from "next/image";

const Logo: React.FC<ILogo> = ({ ticker }) => {
  return (
    <div className="logoContainer">
      <Image
        src={`/${ticker}.png`}
        width={150}
        height={150}
        alt="bolags logga"
        className={Style.stockLogoImg}
      />
    </div>
  );
};

export default Logo;
