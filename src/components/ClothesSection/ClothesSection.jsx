import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";


function ClothesSection({ clothingItems, weatherData, onCardClick }) {
  return (
    <div className="clothesSection">
      <div>
        <p>Your items</p>
        <button>Add New</button>
      </div>
      <ul className="card__list">
        {clothingItems
          .filter((card) => card.weather === weatherData.type)
          .map((filteredCard) => (
            <ItemCard
              key={filteredCard._id}
              item={filteredCard}
              onCardClick={onCardClick}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
