import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.scss';

import 'react-bootstrap';


import Login from './Auth/Login.js';
import ShopList from './Shops/ShopList.js';
import ShopAdd from './Shops/ShopAdd.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/'} component={ShopList} />
        <Route path={'/shop/add/:id'} component={ShopAdd} />
        <Route path={'/shop/add'} component={ShopAdd} />
      </Switch>
    );
  }
}

export default App;
