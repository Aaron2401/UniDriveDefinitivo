import React from 'react'; 
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <nav className="footer-nav">
          <a href="/terminos" className="footer-link">Términos y Condiciones</a>
          <a href="/privacidad" className="footer-link">Política de Privacidad</a>
          <a href="/contacto" className="footer-link">Contacto</a>
        </nav>
        <p className="footer-text">&copy; {new Date().getFullYear()} UniDrive. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;


