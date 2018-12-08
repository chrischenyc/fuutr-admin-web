import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import usersData from './UsersData';
import PaginationTable from '../../containers/PaginationTable/PaginationTable';

const UsersHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">name</th>
    <th scope="col">email</th>
    <th scope="col">phone</th>
    <th scope="col">registered</th>
  </tr>
);

const UserRow = (user) => {
  const userLink = `/users/${user.id}`;

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        <Link to={userLink}>{user.id}</Link>
      </th>
      <td>
        <Link to={userLink}>{user.name}</Link>
      </td>
      <td>tbd</td>
      <td>tbd</td>
      <td>{user.registered}</td>
    </tr>
  );
};

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      total: usersData.length,
    };

    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers() {
    this.setState({ users: usersData });
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
                  total={this.state.total}
                  items={this.state.users}
                  onLoadItemsForPage={this.loadUsers}
                  onReloadItems={(page, limit, search) => {
                    this.loadUsers();
                  }}
                  headerComponent={UsersHeader}
                  rowComponent={UserRow}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
