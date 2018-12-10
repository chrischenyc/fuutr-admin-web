import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert,
} from 'reactstrap';
import _ from 'lodash';

import RoleBadge from '../../components/role-badge';

import { API, normalizedAPIError } from '../../api';
import { dateString } from '../../utils/format-date';
import formatPrice from '../../utils/format-price';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = { user: null, errors: {} };

    this.loadUser = this.loadUser.bind(this);
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

  render() {
    const { user, errors } = this.state;

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
      </div>
    );
  }
}

export default User;
