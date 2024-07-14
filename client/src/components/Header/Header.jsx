import './Header.css';
import {Link}  from "react-router-dom";

const Header = () => {

  return (
    <header className="header">
    
     <Link to="/" className="logo"> UrineVital</Link >
      <nav className="nav-open">
        <Link to="/analyzer">Start Analysis</Link>
      </nav>
    </header>
  );
};

export default Header;
