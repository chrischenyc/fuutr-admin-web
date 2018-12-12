import React, { Component } from 'react';

import {
  Card, CardBody, CardHeader, CardFooter, Col, Row, Alert,
} from 'reactstrap';
import _ from 'lodash';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { PaymentsHeader, PaymentRow } from './Table';

import { API, normalizedAPIError } from '../../api';

class Payments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payments: [],
      pages: 0,
      errors: {},
    };

    this.loadPayments = this.loadPayments.bind(this);
  }

  async loadPayments(page, search) {
    try {
      const response = await API({
        params: { page, search },
        method: 'get',
        url: '/payments',
      });

      const { payments, pages } = response.data;

      this.setState({ payments, pages });
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
                Payments
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchable={false}
                  items={this.state.payments}
                  pages={this.state.pages}
                  loadItemsForPage={this.loadPayments}
                  headerComponent={PaymentsHeader}
                  rowComponent={PaymentRow}
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

export default Payments;
