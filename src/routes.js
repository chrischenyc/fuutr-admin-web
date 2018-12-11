import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Rides = React.lazy(() => import('./views/Rides/Rides'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:_id', exact: true, name: 'User Details', component: User },

  { path: '/rides', exact: true, name: 'Rides', component: Rides },
];

export default routes;
