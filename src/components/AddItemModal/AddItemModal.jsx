import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  isOpen,
  closeActiveModal,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(name, imageUrl, weatherType);
    setName("");
    setImageUrl("");
    setWeatherType("");
  };

  const isSubmitDisabled = !name || !imageUrl || !weatherType;

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      disabled={isSubmitDisabled}
    >
      <div className="modal__form">
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            name="name"
            id="name"
            placeholder="Name"
            required
            minLength={1}
            maxLength={30}
            onChange={handleNameChange}
            value={name}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image URL
          <input
            type="url"
            className="modal__input"
            name="imageUrl"
            id="imageUrl"
            placeholder="Image URL"
            required
            minLength={1}
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="hot"
              name="weatherType"
              value="hot"
              className="modal__radio-input"
              onChange={handleWeatherTypeChange}
              checked={weatherType === "hot"}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="warm"
              name="weatherType"
              value="warm"
              className="modal__radio-input"
              onChange={handleWeatherTypeChange}
              checked={weatherType === "warm"}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="cold"
              name="weatherType"
              value="cold"
              className="modal__radio-input"
              onChange={handleWeatherTypeChange}
              checked={weatherType === "cold"}
            />
            Cold
          </label>
        </fieldset>
      </div>
    </ModalWithForm>
  );
}
