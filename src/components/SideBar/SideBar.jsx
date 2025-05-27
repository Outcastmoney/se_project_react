import "./SideBar.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../CurrentTemperatureUnit";

function SideBar({ clothingItems, weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <div className="sidebar">
      <section className="sidebar__sideBar">
        <img className="sidebar__avatar" src="avatar" alt="default avatar" />
        <p className="sidebar__userName">User name</p>
      </section>
      <section className="sidebar__clothesSection">
        <p className="sidebar__clothesSection-title">Clothes</p>
        <ul className="sidebar__clothesSection-list">
          {clothingItems
            .filter((card) => card.weather === weatherData.type)
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                item={filteredCard}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </div>
  );
}

export default SideBar;
