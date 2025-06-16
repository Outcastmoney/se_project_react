import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  onButtonClick,
  buttonTextAlt,
  disabled = false,
  formClass = "",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close modal__close_type_form"
          onClick={onClose}
        >
          <img src={closeIcon} alt="close" className="modal__close-icon" />
        </button>
        <form className={`modal__form ${formClass}`} onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button 
              type="submit" 
              className="modal__submit" 
              disabled={disabled}
            >
              {buttonText}
            </button>
            {buttonTextAlt && onButtonClick && (
              <button 
                type="button" 
                className="modal__alt-button"
                onClick={onButtonClick}
              >
                {buttonTextAlt}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
