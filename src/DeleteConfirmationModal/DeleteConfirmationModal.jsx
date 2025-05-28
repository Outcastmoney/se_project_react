import React from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, card }) {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <p className="modal__warning">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__actions">
          <button
            className="modal__button modal__button_type_confirm"
            onClick={() => onConfirm(card)}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
