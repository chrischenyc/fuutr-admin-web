import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert,
} from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { API, normalizedAPIError } from '../../api';
import { dateTimeString } from '../../utils/format-date';
import priceString from '../../utils/format-price';
import { userLink, stripePaymentLink } from '../../utils/links';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: null,
      errors: {},
    };

    this.loadPayment = this.loadPayment.bind(this);
  }

  componentDidMount() {
    this.loadPayment();
  }

  async loadPayment() {
    const { _id } = this.props.match.params;

    try {
      const response = await API({ method: 'get', url: `/payments/${_id}` });
      const { data: payment } = response;
      this.setState({ payment });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  render() {
    const { payment, errors } = this.state;

    if (!_.isEmpty(errors.message)) {
      return <Alert color="danger">{errors.message}</Alert>;
    }

    if (!payment) {
      return '';
    }

    const {
      _id, user, amount, description, createdAt, stripeChargeId, lastFour,
    } = payment;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <strong>
                  Payment id:
                  {_id}
                </strong>
              </CardHeader>

              <CardBody>
                <Table responsive striped>
                  <tbody>
                    <tr>
                      <th>User</th>
                      <td>
                        <Link to={userLink(user)}>{user}</Link>
                      </td>
                    </tr>
                    <tr>
                      <th>Amount</th>
                      <td>{priceString(amount)}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{description}</td>
                    </tr>
                    <tr>
                      <th>Time</th>
                      <td>{dateTimeString(createdAt)}</td>
                    </tr>
                    <tr>
                      <th>card number</th>
                      <td>{`xxxx xxxx xxxx ${lastFour}`}</td>
                    </tr>
                    <tr>
                      <th>Stripe transaction</th>
                      <td>
                        <a
                          href={stripePaymentLink(stripeChargeId)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {stripeChargeId}
                        </a>
                      </td>
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

export default Payment;
