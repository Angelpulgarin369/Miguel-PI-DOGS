import React from 'react';
import { Link } from 'react-router-dom';
import './LandingModule.css';

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='landing-content'>
        <h1 className='landing-title'>
          𝕸𝖚𝖓𝖉𝖔 𝕮𝖆𝖓𝖎𝖓𝖔
        </h1>
        
        <Link to="/home" className='landing-button'>
          <button>♥ ingresar ♥</button>
        </Link>
        
        <p className='landing-message'>
        🍫  🎀  𝒰𝓃 𝓁𝓊𝑔𝒶𝓇 𝓅𝒶𝓇𝒶 𝓁💗𝓈 𝒶𝓂𝒶𝓃𝓉𝑒𝓈 𝒹𝑒 𝓁💗𝓈 𝓅𝑒𝓇𝓇🍪𝓈.  🎀  🍫
        </p>
      </div>
    </div>
  );
}

export default Landing;


