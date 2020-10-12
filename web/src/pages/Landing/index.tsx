import React from 'react';

import { FiArrowRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import '../../styles/pages/landing.css';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo" />

        <main>
          <h1>Bring happiness to the world</h1>
          <p>Visit orphanages and change the day of many kids.</p>
        </main>

        <div className="location">
          <strong>Spot of Spotz</strong>
          <span>Streetz of the nightz</span>
        </div>

        <a href="" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </a>
      </div>
    </div>
  );
};

export default Landing;
