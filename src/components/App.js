import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Switch />
    </div>
  </BrowserRouter>
);

export default App;
