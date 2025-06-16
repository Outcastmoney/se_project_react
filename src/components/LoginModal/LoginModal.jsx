import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { authorize } from '../../utils/auth';

const LoginModal = ({ isOpen, onClose, onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          onLogin();
          onClose();
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        setError('Incorrect email or password');
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
      onButtonClick={onRegisterClick}
      buttonTextAlt="or Register"
    >
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

export default LoginModal;
