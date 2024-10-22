import React from 'react';
import {
  DropdownItem, DropdownMenu, DropdownToggle, Nav,
} from 'reactstrap';
import { AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';

const DefaultHeader = props => (
  <React.Fragment>
    <AppSidebarToggler className="d-lg-none" display="md" mobile />

    <AppSidebarToggler className="d-md-down-none" display="lg" />

    <Nav className="ml-auto" navbar>
      <AppHeaderDropdown direction="down">
        <DropdownToggle nav>
          {props.user.displayName}
          <img
            src={props.user.photo || '/assets/img/avatars/default.png'}
            className="img-avatar"
            alt="avatar"
          />
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
