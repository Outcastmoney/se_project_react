import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";


function ClothesSection({ clothingItems, weatherData, onCardClick }) {
  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <p className="clothesSection__header-text">Your items</p>
        <button className="clothesSection__add-btn">+ Add New</button>
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
