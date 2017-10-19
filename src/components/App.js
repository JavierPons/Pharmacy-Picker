import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import NavBar from './NavBar';

import './App.css';

const App = () => (
  <BrowserRouter>
    <div>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
