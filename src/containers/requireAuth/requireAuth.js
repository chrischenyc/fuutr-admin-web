import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// HOC to secure routes
const requireAuth = ({ authenticated, location, component, ...rest }) => {
  if (authenticated) {
    return <Route component={component} {...rest} />;
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

requireAuth.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(requireAuth);
