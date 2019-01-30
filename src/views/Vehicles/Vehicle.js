import React, { Component, Fragment } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert, Button,
} from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { RidesHeader, RideRow } from '../Rides/Table';
import VehicleStatusBadges from '../../components/vehicle-status-badges';

import { API, normalizedAPIError } from '../../api';
import { dateString } from '../../utils/format-date';
import distanceString from '../../utils/format-distance';
import speedModeString from '../../utils/format-speed-mode';
import { coordinatesMapLink, vehicleEditLink } from '../../utils/links';

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
    this.lockVehicle = this.lockVehicle.bind(this);
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

  async lockVehicle(lock) {
    const { _id } = this.props.match.params;

    try {
      await API({ method: 'patch', url: `/vehicles/${_id}/lock`, data: { lock } });
      this.loadVehicle();
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

    const { isAdmin } = this.props.user;

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
      createdAt,
      speedMode,
      odometer,
      remainderRange,
      location,
      locked,
      address,
    } = vehicle;

    return (
      <div className="animated fadeIn">
        {/* vehicle info */}
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                {isAdmin && (
                  <div className="float-right">
                    {locked && (
                      <Fragment>
                        &nbsp;
                        <Button
                          color="success"
                          onClick={() => {
                            this.lockVehicle(false);
                          }}
                        >
                          Unlock
                        </Button>
                      </Fragment>
                    )}

                    {!locked && (
                      <Fragment>
                        &nbsp;
                        <Button
                          color="warning"
                          onClick={() => {
                            this.lockVehicle(true);
                          }}
                        >
                          Lock
                        </Button>
                      </Fragment>
                    )}

                    <Fragment>
                      &nbsp;
                      <Link to={vehicleEditLink(_id)}>
                        <Button>Edit</Button>
                      </Link>
                    </Fragment>
                  </div>
                )}
                
                <img
                  src={unlockQRImage}
                  className="img"
                  alt="Unlock QR Code"
                  style={{ width: '160px', marginRight: '16px' }}
                />
                <h4>
                  <VehicleStatusBadges vehicle={vehicle} />
                </h4>
              </CardHeader>

              <CardBody>
                <Table responsive striped>
                  <tbody>
                    <tr>
                      <th>created</th>
                      <td>{dateString(createdAt)}</td>
                    </tr>

                    <tr>
                      <th>unlock code</th>
                      <td>{unlockCode}</td>
                    </tr>

                    <tr>
                      <th>iot code</th>
                      <td>{iotCode}</td>
                    </tr>

                    <tr>
                      <th>vehicle code</th>
                      <td>{vehicleCode}</td>
                    </tr>

                    <tr>
                      <th>range</th>
                      <td>{distanceString(remainderRange * 10)}</td>
                    </tr>

                    <tr>
                      <th>speedMode</th>
                      <td>{speedModeString(speedMode)}</td>
                    </tr>

                    <tr>
                      <th>odometer</th>
                      <td>{distanceString(odometer * 10)}</td>
                    </tr>

                    <tr>
                      <th>last location</th>
                      <td>
                        {location && location.coordinates && (
                          <Fragment>
                            <a
                              href={coordinatesMapLink(location.coordinates)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="icon-map" />
                            </a>

                            &nbsp;

                            { address && { address }}
                          </Fragment>
                        )}
                      </td>
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
)(Vehicle);
