import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from '../reducers';

import NavBar from './NavBar';
import Landing from './Landing';
import PharmacyNew from '../containers/PharmacyNew';

import './App.css';

// configure react promis middleware to handle
// response from post to api in reducers
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/pharmacy/new" component={PharmacyNew} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
