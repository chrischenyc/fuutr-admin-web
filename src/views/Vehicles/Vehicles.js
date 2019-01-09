import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, CardFooter, Alert,
} from 'reactstrap';
import _ from 'lodash';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { API, normalizedAPIError } from '../../api';
import { VehiclesHeader, VehicleRow } from './Table';
import MapContainer from '../../components/MapContainer';

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
        <Card style={{ height: '600px' }}>
          <MapContainer vehicles={this.state.vehicles} />
        </Card>

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

          {!_.isEmpty(this.state.errors.message) && (
            <CardFooter>
              <Alert color="danger">{this.state.errors.message}</Alert>
            </CardFooter>
          )}
        </Card>
      </div>
    );
  }
}

export default Vehicles;
