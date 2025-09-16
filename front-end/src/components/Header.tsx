import React, { useEffect, useRef } from 'react';
import '../components/styles/header.css';
import Logo from '../assets/INTERA LOGO 1 .png'
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleToggle = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('active');
      }
    };

    const button = hamburgerRef.current;
    if (button) {
      button.addEventListener('click', handleToggle);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleToggle);
      }
    };
  }, []);

  return (
    /* Exemplo de uso 
      <Header />
    */

    <header className="header">
      <nav className="nav" ref={navRef}>
        <Link to="/" className="logo">
          <img src={Logo} alt="Logo" />
        </Link>
        <button className="hamburger" ref={hamburgerRef} aria-label="Menu" />
        <ul className="nav-list">
          <li><Link to="/">Ínicio</Link></li>
          <li><Link to="/parceiros">Parceiros</Link></li>
          <li><Link to="/servicos">Serviços</Link></li>
          <li><Link to="/nossos-projetos">Projetos</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li id="btn-contatos"><Link to="/fale-conosco">Contato</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
