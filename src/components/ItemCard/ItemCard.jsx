import "./ItemCard.css";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onLikeClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;

    if (url.includes("example.com") || url.includes("placeholder"))
      return false;

    return true;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;

    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      item.name
    )}&background=random&color=fff&size=200`;
  };

  let imageSource;
  if (isValidImageUrl(item.imageUrl)) {
    imageSource = item.imageUrl;
  } else if (isValidImageUrl(item.link)) {
    imageSource = item.link;
  } else {
    imageSource = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      item.name
    )}&background=random&color=fff&size=200`;
  }

  const likesArray = Array.isArray(item.likes) ? item.likes : [];
  const [isItemLiked, setIsItemLiked] = useState(false);

  useEffect(() => {
    const liked =
      currentUser && likesArray.some((id) => id === currentUser._id);
    setIsItemLiked(liked);
  }, [currentUser, likesArray, item]);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsItemLiked(!isItemLiked);
    onLikeClick(item._id, isItemLiked);
  };

  return (
    <li className="card">
      <div className="card__header">
        <div className="card__title-container">
          <h2 className="card__title">{item.name}</h2>
        </div>
        {isLoggedIn && (
          <button
            type="button"
            className={`card__like-button ${
              isItemLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
            aria-label={isItemLiked ? "Unlike" : "Like"}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={imageSource}
        alt={item.name}
        onError={handleImageError}
      />
    </li>
  );
}

export default ItemCard;
