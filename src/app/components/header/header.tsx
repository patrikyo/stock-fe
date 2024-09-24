import Style from "./Header.module.css";

const Header = ()=> {
    return (
        <div className={Style.header}>
            <h1 className={Style.headerTitle}>Börsdata</h1>
        </div>
    )
};

export default Header;