import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert,
} from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import RoleBadge from '../../components/role-badge';
import PaginationTable from '../../containers/PaginationTable/PaginationTable';

import { API, normalizedAPIError } from '../../api';
import { dateString } from '../../utils/format-date';
import formatPrice from '../../utils/format-price';

const RidesHeader = () => (
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

const RideRow = (user) => {
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
      <td>{formatPrice(balance)}</td>
      <td>{dateString(createdAt)}</td>
      <td>
        <RoleBadge user={user} />
      </td>
    </tr>
  );
};

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      rides: [],
      ridesPages: 0,
      errors: {},
    };

    this.loadUser = this.loadUser.bind(this);
    this.loadRides = this.loadRides.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    const { _id } = this.props.match.params;

    try {
      const response = await API({ method: 'get', url: `/users/${_id}` });
      const { data: user } = response;
      this.setState({ user });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  async loadRides(page, search) {
    const { _id } = this.props.match.params;

    try {
      const response = await API({
        params: { user: _id, page, search },
        method: 'get',
        url: '/rides',
      });

      const { rides, pages } = response.data;

      this.setState({ rides, ridesPages: pages });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  render() {
    const {
      user, rides, ridesPages, errors,
    } = this.state;

    if (!_.isEmpty(errors.message)) {
      return <Alert color="danger">{errors.message}</Alert>;
    }

    if (!user) {
      return '';
    }

    const {
      _id, displayName, email, countryCode, phoneNumber, balance, createdAt, photo,
    } = user;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <img
                  src={photo || '/assets/img/avatars/default.png'}
                  className="img"
                  alt="avatar"
                  style={{ width: '72px', marginRight: '16px' }}
                />
                <strong>
                  User id:
                  {_id}
                </strong>
                &nbsp;
                <RoleBadge user={user} />
              </CardHeader>

              <CardBody>
                <Table responsive striped>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{displayName}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{`${countryCode || ''} ${phoneNumber || ''}`}</td>
                    </tr>
                    <tr>
                      <th>Balance</th>
                      <td>{formatPrice(balance)}</td>
                    </tr>
                    <tr>
                      <th>Joined</th>
                      <td>{dateString(createdAt)}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <strong>Rides</strong>
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchPlaceholder="search for date or time"
                  items={rides}
                  pages={ridesPages}
                  loadItemsForPage={this.loadRides}
                  headerComponent={RidesHeader}
                  rowComponent={RideRow}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
