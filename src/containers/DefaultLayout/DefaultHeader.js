import React from 'react';
import {
  DropdownItem, DropdownMenu, DropdownToggle, Nav,
} from 'reactstrap';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/brand/logo.svg';

const DefaultHeader = props => (
  <React.Fragment>
    <AppSidebarToggler className="d-lg-none" display="md" mobile />

    <AppNavbarBrand
      full={{
        src: logo,
        width: 89,
        height: 30,
        alt: 'Logo',
      }}
      minimized={{
        src: logo,
        width: 30,
        height: 30,
        alt: 'Logo',
      }}
    />

    <AppSidebarToggler className="d-md-down-none" display="lg" />

    <Nav className="ml-auto" navbar>
      <AppHeaderDropdown direction="down">
        <DropdownToggle nav>
          {/* TODO: real profile name and photo */}
          Xavier
          <img src="/assets/img/avatars/default.png" className="img-avatar" alt="avatar" />
        </DropdownToggle>

        <DropdownMenu right style={{ right: 'auto' }}>
          <DropdownItem onClick={e => props.onLogout(e)}>
            <i className="fa fa-lock" />
            Logout
          </DropdownItem>
        </DropdownMenu>
      </AppHeaderDropdown>
    </Nav>
  </React.Fragment>
);

export default DefaultHeader;
