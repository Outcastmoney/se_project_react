import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { register } from '../../utils/auth';

const RegisterModal = ({ isOpen, onClose, onRegister, onLoginClick }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    register(name, avatar, email, password)
      .then((data) => {
        if (data) {
          onRegister();
          onClose();
        }
      })
      .catch((err) => {
        console.error('Registration error:', err);
        // Parse the error message to extract the status code
        const statusCodeMatch = err.toString().match(/Error:\s*(\d+)/);
        const statusCode = statusCodeMatch ? parseInt(statusCodeMatch[1]) : null;
        
        if (statusCode === 409) {
          setError('Email is already registered. Please use a different email or try logging in.');
        } else if (statusCode === 400) {
          setError('Invalid registration data. Please check your information.');
        } else {
          setError('Registration failed. Please try again later.');
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
      buttonText={isLoading ? 'Signing up...' : 'Sign up'}
      onButtonClick={onLoginClick}
      buttonTextAlt="or Sign in"
    >
      <label className="modal__label">
        <p className="modal__input-title">Name</p>
        <input
          className="modal__input"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
        />
      </label>
      <label className="modal__label">
        <p className="modal__input-title">Avatar URL</p>
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
        />
      </label>
      <label className="modal__label">
        <p className="modal__input-title">Email</p>
        <input
          className="modal__input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>
      <label className="modal__label">
        <p className="modal__input-title">Password</p>
        <input
          className="modal__input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default RegisterModal;
