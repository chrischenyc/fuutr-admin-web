import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardBody, CardHeader, CardFooter, Col, Row, Alert,
} from 'reactstrap';
import _ from 'lodash';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import RoleBadge from '../../components/role-badge';
import { API, normalizedAPIError } from '../../api';
import { dateString } from '../../utils/format-date';
import priceString from '../../utils/format-price';

const UsersHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">name</th>
    <th scope="col">email</th>
    <th scope="col">phone</th>
    <th scope="col">balance</th>
    <th scope="col">registered</th>
    <th scope="col">role</th>
  </tr>
);

const UserRow = (user) => {
  const {
    _id, displayName, email, countryCode, phoneNumber, balance, createdAt,
  } = user;

  const userLink = `/users/${_id}`;

  return (
    <tr key={_id}>
      <td>
        <Link to={userLink}>{_id}</Link>
      </td>
      <td>
        <Link to={userLink}>{displayName}</Link>
      </td>
      <td>{email}</td>
      <td>{`${countryCode || ''} ${phoneNumber || ''}`}</td>
      <td>{priceString(balance)}</td>
      <td>{dateString(createdAt)}</td>
      <td>
        <RoleBadge user={user} />
      </td>
    </tr>
  );
};

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      pages: 0,
      errors: {},
    };

    this.loadUsers = this.loadUsers.bind(this);
  }

  async loadUsers(page, search) {
    try {
      const response = await API({
        params: { page, search },
        method: 'get',
        url: '/users',
      });

      const { users, pages } = response.data;

      this.setState({ users, pages });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                Users
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchPlaceholder="search for first name, last name, email, or phone number"
                  items={this.state.users}
                  pages={this.state.pages}
                  loadItemsForPage={this.loadUsers}
                  headerComponent={UsersHeader}
                  rowComponent={UserRow}
                />
              </CardBody>

              <CardFooter>
                {!_.isEmpty(this.state.errors.message) && (
                  <Alert color="danger">{this.state.errors.message}</Alert>
                )}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
