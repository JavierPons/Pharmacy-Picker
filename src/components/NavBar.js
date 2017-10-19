import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => (
  <div className="topnav " id="myTopnav">
    <Link to="/">Perciption Filler</Link>
    <Link to="/perscriptions/new">Get Started</Link>
  </div>
);

export default NavBar;
