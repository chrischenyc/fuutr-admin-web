import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert,
} from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import RideStatusBadge from '../../components/ride-status-badge';

import { API, normalizedAPIError } from '../../api';
import { dateTimeString } from '../../utils/format-date';
import priceString from '../../utils/format-price';
import distanceString from '../../utils/format-distance';
import durationString from '../../utils/format-duration';
import { userLink, vehicleLink, coordinatesMapLink } from '../../utils/links';

class Ride extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ride: null,
      errors: {},
    };

    this.loadRide = this.loadRide.bind(this);
  }

  componentDidMount() {
    this.loadRide();
  }

  async loadRide() {
    const { _id } = this.props.match.params;

    try {
      const response = await API({ method: 'get', url: `/rides/${_id}` });
      const { data: ride } = response;
      this.setState({ ride });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  render() {
    const { ride, errors } = this.state;

    if (!_.isEmpty(errors.message)) {
      return <Alert color="danger">{errors.message}</Alert>;
    }

    if (!ride) {
      return '';
    }

    const {
      _id,
      user,
      scooter,
      unlockTime,
      lockTime,
      unlockLocation,
      lockLocation,
      duration,
      distance,
      unlockCost,
      minuteCost,
      totalCost,
    } = ride;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <strong>
                  Ride id:
                  {_id}
                </strong>
                &nbsp;
                <RideStatusBadge ride={ride} />
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
                      <th>Vehicle</th>
                      <td>
                        <Link to={vehicleLink(scooter)}>{scooter}</Link>
                      </td>
                    </tr>
                    <tr>
                      <th>Unlock Time</th>
                      <td>{dateTimeString(unlockTime)}</td>
                    </tr>
                    <tr>
                      <th>Lock Time</th>
                      <td>{dateTimeString(lockTime)}</td>
                    </tr>
                    <tr>
                      <th>Unlock Location</th>
                      <td>
                        {unlockLocation && unlockLocation.coordinates && (
                          <a
                            href={coordinatesMapLink(unlockLocation.coordinates)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-map" />
                          </a>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Lock Location</th>
                      <td>
                        {lockLocation && lockLocation.coordinates && (
                          <a
                            href={coordinatesMapLink(lockLocation.coordinates)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-map" />
                          </a>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Duration</th>
                      <td>{durationString(duration)}</td>
                    </tr>
                    <tr>
                      <th>Distance</th>
                      <td>{distanceString(distance)}</td>
                    </tr>
                    <tr>
                      <th>Unlock Cost</th>
                      <td>{priceString(unlockCost)}</td>
                    </tr>
                    <tr>
                      <th>Riding Cost</th>
                      <td>{priceString(minuteCost)}</td>
                    </tr>
                    <tr>
                      <th>Total Cost</th>
                      <td>{priceString(totalCost)}</td>
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

export default Ride;
