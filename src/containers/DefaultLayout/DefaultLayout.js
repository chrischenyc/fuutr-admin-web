import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import { connect } from 'react-redux';

// sidebar nav config
import navigationAdmin from '../../nav-admin';
import navigationCouncil from '../../nav-council';
// routes config
import routes from '../../routes';

import { userSignedOut } from '../../store/user';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  signOut(e) {
    e.preventDefault();
    this.props.userSignedOut();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} user={this.props.user} />
          </Suspense>
        </AppHeader>

        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={this.props.user.isAdmin ? navigationAdmin : navigationCouncil}
                {...this.props}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>

          <main className="main">
            <AppBreadcrumb appRoutes={routes} />

            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  { userSignedOut },
)(DefaultLayout);
