import React, { Component } from 'react';

import {
  Card, CardBody, CardHeader, CardFooter, Col, Row, Alert,
} from 'reactstrap';
import _ from 'lodash';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { RidesHeader, RideRow } from './Table';

import { API, normalizedAPIError } from '../../api';

class Rides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rides: [],
      pages: 0,
      errors: {},
    };

    this.loadRides = this.loadRides.bind(this);
  }

  async loadRides(page, search) {
    try {
      const response = await API({
        params: { page, search },
        method: 'get',
        url: '/rides',
      });

      const { rides, pages } = response.data;

      this.setState({ rides, pages });
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
                Rides
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchable={false}
                  items={this.state.rides}
                  pages={this.state.pages}
                  loadItemsForPage={this.loadRides}
                  headerComponent={RidesHeader}
                  rowComponent={RideRow}
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

export default Rides;
