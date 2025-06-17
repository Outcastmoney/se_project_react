import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };


  const isValidImageUrl = (url) => {
    if (!url) return false;
    

    if (url.includes('example.com') || url.includes('placeholder')) return false;
    
    return true;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;

    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&color=fff&size=200`;
  };


  let imageSource;
  if (isValidImageUrl(item.imageUrl)) {
    imageSource = item.imageUrl;
  } else if (isValidImageUrl(item.link)) {
    imageSource = item.link;
  } else {

    imageSource = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&color=fff&size=200`;
  }

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
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
