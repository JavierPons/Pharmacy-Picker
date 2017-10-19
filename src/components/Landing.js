import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

const Landing = () => (
  <div>
    <header className="head">
      <div className="header-content">
        <div className="header-content-inner">
          <h1>YOUR PERSCRIPTION YOUR CHOICE</h1>
          <hr />
          <p>Fill out our pharmacy selector form to get your perscriptions filled and shiped to a pharmacy near you.</p>
          <Link to="/pharmacy/new" className="btn btn-primary">
            GET STARTED
          </Link>
        </div>
      </div>
    </header>
  </div>
);

export default Landing;
