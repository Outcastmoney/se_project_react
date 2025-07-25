import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";
import DeleteButton from "../../DeleteButton/DeleteButton";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, onClose, onDelete, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  
  const isOwner = currentUser && card && card.owner === currentUser._id;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        >
          <img src={closeIcon} alt="close" className="modal__close-icon modal__close-icon_type_add" />
        </button>
        <img src={card.imageUrl || card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isLoggedIn && isOwner && (
            <DeleteButton onClick={() => onDelete(card)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
