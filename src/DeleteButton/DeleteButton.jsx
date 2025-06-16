// DeleteButton component
import "./DeleteButton.css";

function DeleteButton({ onClick }) {
  return (
    <button className="modal__delete" onClick={onClick} type="button">
      Delete item
    </button>
  );
}

export default DeleteButton;
