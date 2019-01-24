import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, CardFooter, Alert, Button,
} from 'reactstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { API, normalizedAPIError } from '../../api';
import { VehiclesHeader, VehicleRow } from './Table';
import GoogleMapContainer from '../../components/GoogleMapContainer';

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
    const { isAdmin } = this.props.user;

    return (
      <div className="animated fadeIn">
        <Card style={{ height: '600px' }}>
          <GoogleMapContainer vehicles={this.state.vehicles} />
        </Card>

        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" />
            Vehicles
            {isAdmin && (
              <div className="float-right">
                <Link to="/vehicles/add">
                  <Button color="primary">Add Vehicle</Button>
                </Link>
              </div>
            )}
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Vehicles);
