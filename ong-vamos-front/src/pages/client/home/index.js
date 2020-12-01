import React from 'react';
import { Link } from 'react-router-dom'
import logoImage from '../../../assets/images/logo.jpeg';
import configIcon from '../../../assets/icons/engrenagens.png';

import './index.css'


function Home() {
  return (
    <div className="container-logo">
      <Link to="/admin">
        <img src={configIcon} className="icon" width="80" height="80" alt="Config" />
      </Link>
      <img src={logoImage} width="500" height="500" alt="VAMOS"/>
    </div>
  );
}

export default Home;