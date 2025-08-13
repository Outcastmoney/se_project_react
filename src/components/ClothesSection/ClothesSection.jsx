import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems = [], onCardClick, onAddItem, isLoggedIn, onLikeClick }) {
  // Log the clothingItems for debugging


  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <p className="clothesSection__header-text">Your items</p>
        <button className="clothesSection__add-btn" onClick={onAddItem}>+ Add New</button>
      </div>
      <ul className="card__list">
        {Array.isArray(clothingItems) && clothingItems.length > 0 ? (
          clothingItems.map((filteredCard) => (
            <ItemCard
              key={filteredCard._id}
              item={filteredCard}
              onCardClick={onCardClick}
              isLoggedIn={isLoggedIn}
              onLikeClick={onLikeClick}
            />
          ))
        ) : (
          <div className="clothesSection__empty-message">
            No items found. Click &apos;+ Add New&apos; to add your first item.
          </div>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
