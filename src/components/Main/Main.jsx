import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick }) {
  // Filter clothing items based on the current weather type
  const filteredItems = defaultClothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="card__list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))
          ) : (
            <p className="cards__text">No items found for this weather condition.</p>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
