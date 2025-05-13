import "./Header.css";
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
function Header({handleAddClick}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-and-location">date, location</p>
      <button className="header__add-clothes-btn" onClick={handleAddClick}>+ add clothes</button>
      <div className="header__user-container">
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
