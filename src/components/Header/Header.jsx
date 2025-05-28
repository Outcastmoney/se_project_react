import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="wtwr logo" />
        </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      </div>
      <ToggleSwitch />
      <button className="header__add-clothes-btn" onClick={handleAddClick}>
        + add clothes
      </button>
      <Link to="/profile" className="header__link">
      <div className="header__user-container">
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
      </Link>
    </header>
  );
}
export default Header;
