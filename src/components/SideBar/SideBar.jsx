import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";

function SideBar({ onLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <section className="sidebar__sideBar">
        <div className="sidebar__avatar-name-container">
          <img
            className="sidebar__avatar"
            src={currentUser?.avatar || avatar}
            alt={currentUser?.name || "User"}
          />
          <p className="sidebar__userName">
            {currentUser ? currentUser.name : "Terrence Tegegne"}
          </p>
        </div>
        <div className="sidebar__buttons">
          <button onClick={onEditProfile} className="sidebar__button-edit">
            Change profile data
          </button>
          <button className="sidebar__button-logout" onClick={onLogout}>
            Log out
          </button>
        </div>
      </section>
    </div>
  );
}

export default SideBar;
