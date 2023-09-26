import React from 'react';
import { Link } from 'react-router-dom';
import './NavBarModule.css';

function Navbar() {
  return (
    <div className="navbar">
    <ul>
      <li><Link to="/" className="btn-logout">𝓒𝓮𝓻𝓻𝓪𝓻 𝓼𝓮𝓼𝓲ó𝓷</Link></li>
      <li><Link to="/form" className="btn-create">𝓒𝓻𝓮𝓪𝓻 𝓷𝓾𝓮𝓿𝓪 𝓻𝓪𝔃𝓪</Link></li>
      <li><Link to="/Home" className="btn-home">𝓗𝓸𝓶𝓮</Link></li>
    </ul>
  </div>
  );
}

export default Navbar;

