// AuthForm component
import './AuthForm.css';

const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  children,
  isValid = true,
  submitButtonText,
}) => {
  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <h2 className="auth-form__title">{title}</h2>
      <div className="auth-form__inputs">
        {children}
      </div>
      <button 
        type="submit" 
        className={`auth-form__submit-button ${!isValid ? 'auth-form__submit-button_disabled' : ''}`}
        disabled={!isValid}
      >
        {submitButtonText || buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
