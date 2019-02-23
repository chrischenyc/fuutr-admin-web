import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table, Alert,
} from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import IssueStatusBadges from '../../components/issue-status-badges';

import { API, normalizedAPIError } from '../../api';
import { dateTimeString } from '../../utils/format-date';

import {
  userLink, vehicleLink, coordinatesMapLink, rideLink,
} from '../../utils/links';

class Issue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issue: null,
      errors: {},
    };

    this.loadIssue = this.loadIssue.bind(this);
  }

  componentDidMount() {
    this.loadIssue();
  }

  async loadIssue() {
    const { _id } = this.props.match.params;

    try {
      const response = await API({ method: 'get', url: `/issues/${_id}` });
      const { data: issue } = response;
      this.setState({ issue });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  render() {
    const { issue, errors } = this.state;

    if (!_.isEmpty(errors.message)) {
      return <Alert color="danger">{errors.message}</Alert>;
    }

    if (!issue) {
      return '';
    }

    const {
      _id, description, user, location, vehicle, ride, photo, createdAt,
    } = issue;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={10}>
            <Card>
              <CardHeader>
                <strong>
                  Issue id:
                  {_id}
                </strong>
                &nbsp;
                <IssueStatusBadges issue={issue} />
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
                      <td>{vehicle && <Link to={vehicleLink(vehicle)}>{vehicle}</Link>}</td>
                    </tr>
                    <tr>
                      <th>Ride</th>
                      <td>{ride && <Link to={rideLink(ride)}>{ride}</Link>}</td>
                    </tr>

                    <tr>
                      <th>Reported</th>
                      <td>{dateTimeString(createdAt)}</td>
                    </tr>

                    <tr>
                      <th>Report Location</th>
                      <td>
                        {location && location.coordinates && (
                          <a
                            href={coordinatesMapLink(location.coordinates)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="icon-map" />
                          </a>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th>Description</th>
                      <td>{description}</td>
                    </tr>

                    <tr>
                      <th>photo</th>
                      <td>
                        {photo && (
                          <a href={photo}>
                            <img src={photo} alt="issue" style={{ width: '400px' }} />
                          </a>
                        )}
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

export default Issue;
