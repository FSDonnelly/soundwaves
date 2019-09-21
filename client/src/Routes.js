import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './hoc/Auth';
import Layout from './hoc/Layout';
import Home from './components/Home';
import RegisterLogin from './components/Register-Login/RegisterLogin';
import Register from './components/Register-Login/Register';
import UserDashboard from './components/PrivateRoutes/UserDashboard';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Auth(Home, null)} />
        <Route
          path='/register_login'
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path='/register' exact component={Auth(Register, false)} />
        <Route
          path='/user/dashboard'
          exact
          component={Auth(UserDashboard, false)}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
