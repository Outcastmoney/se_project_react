import { useState, useEffect, useCallback } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { register } from "../../utils/auth";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onSubmit, onLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [avatarTouched, setAvatarTouched] = useState(false);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };
  
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };
  
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
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = validateName(name);
    const isAvatarValid = validateAvatar(avatar);
    
    setIsFormValid(isEmailValid && isPasswordValid && isNameValid && isAvatarValid);
  }, [email, password, name, avatar]);
  
  useEffect(() => {
    if (isOpen) {
      validateForm();
    } else {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
      setEmailError("");
      setPasswordError("");
      setNameError("");
      setAvatarError("");
      setEmailTouched(false);
      setPasswordTouched(false);
      setNameTouched(false);
      setAvatarTouched(false);
      setError("");
    }
  }, [isOpen, validateForm]);
  
  useEffect(() => {
    if (isOpen) {
      validateForm();
    }
  }, [email, password, name, avatar, isOpen, validateForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    setNameTouched(true);
    setAvatarTouched(true);
    validateForm();
    
    if (!isFormValid) {
      return;
    }
    
    setError("");
    setIsLoading(true);
    setError("");

    register(name, avatar, email, password)
      .then((data) => {
        if (data) {
          return import("../../utils/auth").then((authModule) => {
            return authModule.authorize(email, password);
          });
        }
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("jwt", data.token);

          onSubmit(data.token);
          onClose();
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);

        // Check if this is a network error (Failed to fetch)
        if (err instanceof TypeError && err.message.includes('fetch')) {
          setError("Network error: Unable to connect to the server. Please check your internet connection and try again.");
          return;
        }

        const statusCodeMatch = err.toString().match(/Error:\s*(\d+)/);
        const statusCode = statusCodeMatch
          ? parseInt(statusCodeMatch[1])
          : null;

        if (statusCode === 409) {
          setError(
            "Email is already registered. Please use a different email or try logging in."
          );
        } else if (statusCode === 400) {
          setError("Invalid registration data. Please check your information.");
        } else {
          setError("Registration failed. Please try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign up"
      buttonText={isLoading ? "Signing up..." : "Sign up"}
      showDefaultButtons={false}
    >
      <label className="register-modal__label">
        <p className="register-modal__input-title">Email</p>
        <input
          className={`register-modal__input ${emailTouched && emailError ? 'register-modal__input_error' : ''}`}
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            setEmailTouched(true);
            validateEmail(email);
          }}
        />
        {emailTouched && emailError && <p className="register-modal__input-error">{emailError}</p>}
      </label>
      <label className="register-modal__label">
        <p className="register-modal__input-title">Password</p>
        <input
          className={`register-modal__input ${passwordTouched && passwordError ? 'register-modal__input_error' : ''}`}
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            setPasswordTouched(true);
            validatePassword(password);
          }}
        />
        {passwordTouched && passwordError && <p className="register-modal__input-error">{passwordError}</p>}
      </label>
      <label className="register-modal__label">
        <p className="register-modal__input-title">Name</p>
        <input
          className={`register-modal__input ${nameTouched && nameError ? 'register-modal__input_error' : ''}`}
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            setNameTouched(true);
            validateName(name);
          }}
        />
        {nameTouched && nameError && <p className="register-modal__input-error">{nameError}</p>}
      </label>
      <label className="register-modal__label">
        <p className="register-modal__input-title">Avatar URL</p>
        <input
          className={`register-modal__input ${avatarTouched && avatarError ? 'register-modal__input_error' : ''}`}
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          onBlur={() => {
            setAvatarTouched(true);
            validateAvatar(avatar);
          }}
        />
        {avatarTouched && avatarError && <p className="register-modal__input-error">{avatarError}</p>}
      </label>
      {error && <p className="register-modal__error">{error}</p>}
      <div className="register-modal__buttons">
        <button 
          type="submit" 
          className="register-modal__submit-button"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <button 
          type="button" 
          className="register-modal__alt-button"
          onClick={onLoginClick}
        >
          Or Login
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
