import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert,
} from 'reactstrap';
import _ from 'lodash';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { RidesHeader, RideRow } from '../Rides/Table';
import VehicleStatusBadges from '../../components/vehicle-status-badges';

import { API, normalizedAPIError } from '../../api';
import { dateString } from '../../utils/format-date';
import distanceString from '../../utils/format-distance';

class Vehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicle: null,
      rides: [],
      ridesPages: 0,
      errors: {},
    };

    this.loadVehicle = this.loadVehicle.bind(this);
    this.loadRides = this.loadRides.bind(this);
  }

  componentDidMount() {
    this.loadVehicle();
  }

  async loadVehicle() {
    const { _id } = this.props.match.params;

    try {
      const response = await API({ method: 'get', url: `/vehicles/${_id}` });
      const { data: vehicle } = response;
      this.setState({ vehicle });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  async loadRides(page) {
    const { _id } = this.props.match.params;

    try {
      const response = await API({
        params: { vehicle: _id, page },
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
      vehicle, rides, ridesPages, errors,
    } = this.state;

    if (!_.isEmpty(errors.message)) {
      return <Alert color="danger">{errors.message}</Alert>;
    }

    if (!vehicle) {
      return '';
    }

    const {
      _id,
      unlockCode,
      unlockQRImage,
      iotCode,
      vehicleCode,
      remainderRange,
      createdAt,
    } = vehicle;

    return (
      <div className="animated fadeIn">
        {/* vehicle info */}
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <img
                  src={unlockQRImage}
                  className="img"
                  alt="Unlock QR Code"
                  style={{ width: '160px', marginRight: '16px' }}
                />
                <strong>
                  Vehicle id:
                  {_id}
                </strong>
                &nbsp;
                <VehicleStatusBadges vehicle={vehicle} />
              </CardHeader>

              <CardBody>
                <Table responsive striped>
                  <tbody>
                    <tr>
                      <th>unlockCode</th>
                      <td>{unlockCode}</td>
                    </tr>

                    <tr>
                      <th>iotCode</th>
                      <td>{iotCode}</td>
                    </tr>

                    <tr>
                      <th>vehicleCode</th>
                      <td>{vehicleCode}</td>
                    </tr>

                    <tr>
                      <th>remainderRange</th>
                      <td>{distanceString(remainderRange)}</td>
                    </tr>

                    <tr>
                      <th>Created</th>
                      <td>{dateString(createdAt)}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* vehicle's rides */}
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
      </div>
    );
  }
}

export default Vehicle;
