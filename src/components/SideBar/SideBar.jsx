import "./SideBar.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../CurrentTemperatureUnit";
import avatar from "../../assets/avatar.svg";
function SideBar({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <div className="sidebar">
      <section className="sidebar__sideBar">
        <img className="sidebar__avatar" src={avatar} alt="default avatar" />
        <p className="sidebar__userName">Terrence Tegegne</p>
      </section>
    </div>
  );
}

export default SideBar;
