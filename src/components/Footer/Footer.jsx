import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text footer__text_type_developer">Developed by Amoney</p>
        <p className="footer__text footer__text_type_date">© {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
