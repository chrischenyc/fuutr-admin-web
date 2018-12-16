import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, CardFooter, Col, Row, Alert,
} from 'reactstrap';
import _ from 'lodash';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { API, normalizedAPIError } from '../../api';
import { VehiclesHeader, VehicleRow } from './Table';

class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      pages: 0,
      errors: {},
    };

    this.loadVehicles = this.loadVehicles.bind(this);
  }

  async loadVehicles(page, search) {
    try {
      const response = await API({
        params: { page, search },
        method: 'get',
        url: '/vehicles',
      });

      const { vehicles, pages } = response.data;

      this.setState({ vehicles, pages });
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
                Vehicles
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchPlaceholder="search for unlock code, IoT code, vehicle code"
                  items={this.state.vehicles}
                  pages={this.state.pages}
                  loadItemsForPage={this.loadVehicles}
                  headerComponent={VehiclesHeader}
                  rowComponent={VehicleRow}
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

export default Vehicles;
