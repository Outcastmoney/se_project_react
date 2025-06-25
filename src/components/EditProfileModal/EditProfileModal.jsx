import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [nameError, setNameError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  

  const justSubmittedRef = useRef(false);
  const formLoadedRef = useRef(false);
  
  const validateName = (name) => {
    if (!name) {
      setNameError("Name is required");
      return false;
    } else if (name.length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    } else if (name.length > 30) {
      setNameError("Name cannot exceed 30 characters");
      return false;
    }
    setNameError("");
    return true;
  };
  
  const validateAvatar = (avatar) => {
    if (avatar && !avatar.startsWith("http")) {
      setAvatarError("Avatar must be a valid URL");
      return false;
    }
    setAvatarError("");
    return true;
  };
  
  const validateForm = useCallback(() => {
    const isNameValid = validateName(name);
    const isAvatarValid = validateAvatar(avatar);

    setIsFormValid(isNameValid && isAvatarValid);
  }, [name, avatar]);
  
  useEffect(() => {
    if (isOpen && currentUser) {
      // Pre-fill the form with current user data
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setNameError("");
      setAvatarError("");
      setIsFormValid(true);
      justSubmittedRef.current = false;
    } else if (!isOpen) {
      // Only reset form when closed
      formLoadedRef.current = false;
    }
  }, [isOpen, currentUser]);
  
  useEffect(() => {
    if (isOpen) {
      validateForm();
    }
  }, [name, avatar, isOpen, validateForm]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isNameValid = validateName(name);
    const isAvatarValid = validateAvatar(avatar);
    
    if (!isNameValid || !isAvatarValid) {
      return;
    }
    
    justSubmittedRef.current = true;
    
    setName("");
    setAvatar("");
    
    onSubmit({ name, avatar });
  }

  return (
    <ModalWithForm
      formClass="edit-profile-modal__form"
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      showDefaultButtons={false}
    >
      <label className="edit-profile-modal__label">
        <p className="edit-profile-modal__input-title">Name*</p>
        <input
          className={`edit-profile-modal__input ${nameError ? 'edit-profile-modal__input_error' : ''}`}
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
          onBlur={() => validateName(name)}
        />
        {nameError && <p className="edit-profile-modal__input-error">{nameError}</p>}
      </label>
      <label className="edit-profile-modal__label">
        <p className="edit-profile-modal__input-title">Avatar URL</p>
        <input
          className={`edit-profile-modal__input ${avatarError ? 'edit-profile-modal__input_error' : ''}`}
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          onBlur={() => validateAvatar(avatar)}
        />
        {avatarError && <p className="edit-profile-modal__input-error">{avatarError}</p>}
      </label>
      <div className="edit-profile-modal__buttons">
        <button 
          type="submit" 
          className="edit-profile-modal__submit-button" 
          disabled={!isFormValid}
        >
          Save changes
        </button>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
