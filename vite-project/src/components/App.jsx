import { useState } from "react";

import "./app.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>

      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        isOpen={activeModal === "add-garment"}
        closeActiveModal={closeActiveModal}
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
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                id="hot"
                name="weatherType"
                value="hot"
                className="modal__radio-input"
                required
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
              />
              Cold
            </label>
          </fieldset>
        </div>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
