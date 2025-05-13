import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal   , closeActiveModal }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={closeActiveModal}>
          CLOSE
        </button>
        <form>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
