import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import store from './store';
import requireAuth from './containers/requireAuth/requireAuth';

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout/DefaultLayout'),
  loading,
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Login/Login'),
  loading,
});

const Page404 = Loadable({
  loader: () => import('./views/Page404/Page404'),
  loading,
});

const Page500 = Loadable({
  loader: () => import('./views/Page500/Page500'),
  loading,
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/404" component={Page404} />
            <Route exact path="/500" component={Page500} />
            <Route path="/" component={DefaultLayout} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
