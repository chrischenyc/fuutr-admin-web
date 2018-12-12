import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Rides = React.lazy(() => import('./views/Rides/Rides'));
const Ride = React.lazy(() => import('./views/Rides/Ride'));
const Payments = React.lazy(() => import('./views/Payments/Payments'));
const Payment = React.lazy(() => import('./views/Payments/Payment'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:_id', exact: true, name: 'User Details', component: User },

  { path: '/rides', exact: true, name: 'Rides', component: Rides },
  { path: '/rides/:_id', exact: true, name: 'Ride Details', component: Ride },

  { path: '/payments', exact: true, name: 'Payments', component: Payments },
  { path: '/payments/:_id', exact: true, name: 'Payment Details', component: Payment },
];

export default routes;
