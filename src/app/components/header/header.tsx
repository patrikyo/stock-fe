import Style from "./header.module.css";

const Header = ()=> {
    return (
        <div className={Style.container}>
            <h1 className={Style.header}>Börsdata</h1>
        </div>
    )
};

export default Header;