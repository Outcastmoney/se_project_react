import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";

import DeleteButton from "../../DeleteButton/DeleteButton";

function ItemModal({ isOpen, card, closeActiveModal, onDelete }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={closeActiveModal}
        >
          <img src={closeIcon} alt="close" className="modal__close-icon modal__close-icon_type_add" />
        </button>
        <img src={card.imageUrl || card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <DeleteButton onClick={() => onDelete(card)} />
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
