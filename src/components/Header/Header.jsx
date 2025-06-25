import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/wtwr.svg";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLogin,
  onRegister,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  // We use Link components for navigation instead of programmatic navigation

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src={logo} alt="wtwr logo" />
          </Link>
        </div>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right-container">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__user-name">
                  {currentUser?.name || "User"}
                </p>
                <img
                  src={currentUser?.avatar || avatar}
                  alt={currentUser?.name || "User"}
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              className="header__button header__button_type_register"
              onClick={onRegister}
            >
              Sign up
            </button>
            <button
              className="header__button header__button_type_login"
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
