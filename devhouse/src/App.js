import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './style/App.scss';

import Login from './Auth/Login.js';
import ShopList from './Shops/ShopList.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/'} component={ShopList} />
      </Switch>
    );
  }
}

export default App;
