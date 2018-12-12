import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert,
} from 'reactstrap';
import _ from 'lodash';

import RoleBadge from '../../components/role-badge';
import TransactionTypeBadge from '../../components/transaction-type-badge';
import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { RidesHeader, RideRow } from '../Rides/Table';
import { PaymentsHeader, PaymentRow } from '../Payments/Table';

import { API, normalizedAPIError } from '../../api';
import { dateString, dateTimeString } from '../../utils/format-date';

import priceString from '../../utils/format-price';
import { shortenedId } from '../../utils/trunc-string';

const TransactionHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">time</th>
    <th scope="col">type</th>
    <th scope="col">amount</th>
    <th scope="col">balance</th>
  </tr>
);

const TransactionRow = (transaction) => {
  const {
    _id, amount, balance, createdAt,
  } = transaction;

  return (
    <tr key={_id}>
      <td>{shortenedId(_id)}</td>
      <td>{dateTimeString(createdAt)}</td>
      <td>
        <TransactionTypeBadge transaction={transaction} />
      </td>
      <td>{priceString(amount)}</td>
      <td>{priceString(balance)}</td>
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
      payments: [],
      paymentsPages: 0,
      transactions: [],
      transactionsPages: 0,
      errors: {},
    };

    this.loadUser = this.loadUser.bind(this);
    this.loadRides = this.loadRides.bind(this);
    this.loadPayments = this.loadPayments.bind(this);
    this.loadTransactions = this.loadTransactions.bind(this);
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

  async loadRides(page) {
    const { _id } = this.props.match.params;

    try {
      const response = await API({
        params: { user: _id, page },
        method: 'get',
        url: '/rides',
      });

      const { rides, pages } = response.data;

      this.setState({ rides, ridesPages: pages });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  async loadPayments(page) {
    const { _id } = this.props.match.params;

    try {
      const response = await API({
        params: { user: _id, page },
        method: 'get',
        url: '/payments',
      });

      const { payments, pages } = response.data;

      this.setState({ payments, paymentsPages: pages });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  async loadTransactions(page) {
    const { _id } = this.props.match.params;

    try {
      const response = await API({
        params: { user: _id, page },
        method: 'get',
        url: '/transactions',
      });

      const { transactions, pages } = response.data;

      this.setState({ transactions, transactionsPages: pages });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  render() {
    const {
      user,
      rides,
      ridesPages,
      payments,
      paymentsPages,
      transactions,
      transactionsPages,
      errors,
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
        {/* user info */}
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
                      <td>{priceString(balance)}</td>
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

        {/* user's rides */}
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <strong>Rides</strong>
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchable={false}
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

        {/* user's payments */}
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <strong>Payments</strong>
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchable={false}
                  items={payments}
                  pages={paymentsPages}
                  loadItemsForPage={this.loadPayments}
                  headerComponent={PaymentsHeader}
                  rowComponent={PaymentRow}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* user's transactions */}
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <strong>Transactions</strong>
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchable={false}
                  items={transactions}
                  pages={transactionsPages}
                  loadItemsForPage={this.loadTransactions}
                  headerComponent={TransactionHeader}
                  rowComponent={TransactionRow}
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
