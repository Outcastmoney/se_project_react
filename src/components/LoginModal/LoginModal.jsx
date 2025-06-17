import { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { authorize } from '../../utils/auth';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onSubmit, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      validateForm();
    } else {
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      setError('');
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      validateForm();
    }
  }, [email, password]);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    
    if (!isFormValid) {
      return;
    }
    
    setIsLoading(true);
    setError('');

    console.log(`Attempting login with email: ${email}`);

    authorize(email, password)
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("jwt", data.token);
          onSubmit(data.token);
          // Reset form data
          setEmail('');
          setPassword('');
          setError('');
          onClose();
        } else {
          setError('Login response missing token');
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        if (err.details && err.details.message) {
          setError(`Error: ${err.details.message}`);
        } else {
          setError('Login failed. Please check your email and password.');
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
      title="Sign in"
      buttonText={isLoading ? 'Signing in...' : 'Sign in'}
      showDefaultButtons={false}
    >
      <label className="login-modal__label">
        <p className="login-modal__input-title">Email</p>
        <input
          className={`login-modal__input ${emailError ? 'login-modal__input_error' : ''}`}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
          placeholder="Email"
          required
        />
        {emailError && <p className="login-modal__input-error">{emailError}</p>}
      </label>
      <label className="login-modal__label">
        <p className="login-modal__input-title">Password</p>
        <input
          className={`login-modal__input ${passwordError ? 'login-modal__input_error' : ''}`}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validatePassword(password)}
          placeholder="Password"
          required
        />
        {passwordError && <p className="login-modal__input-error">{passwordError}</p>}
      </label>
      {error && <p className="login-modal__error">{error}</p>}
      <div className="login-modal__buttons">
        <button 
          type="submit" 
          className="login-modal__submit-button"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        <button 
          type="button" 
          className="login-modal__alt-button"
          onClick={onRegisterClick}
        >
          Sign up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
