import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout';
import Home from './components/layout/Home';
import Routes from './components/routing/Routes';

import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/user';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Layout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route component={Routes} />
            </Switch>
          </Layout>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
