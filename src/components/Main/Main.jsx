import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

const Main = ({ weatherData, handleCardClick, clothingItems, isLoggedIn, onLikeClick }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="card__list">
          {clothingItems.length > 0 ? (
            clothingItems
              .filter((card) => {
                if (!weatherData.type || !clothingItems.some(item => item.weather === weatherData.type)) {
                  return true;
                }
                return card.weather === weatherData.type;
              })
              .map((filteredCard) => (
                <ItemCard
                  key={filteredCard._id}
                  item={filteredCard}
                  onCardClick={handleCardClick}
                  onLikeClick={onLikeClick}
                  isLoggedIn={isLoggedIn}
                />
              ))
          ) : (
            <p className="cards__empty">No clothing items available</p>
          )}
        </ul>
      </section>
    </main>
  );
};

export default Main;
