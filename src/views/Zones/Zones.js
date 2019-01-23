import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Alert, Row, Col, Button } from 'reactstrap';
import _ from 'lodash';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { API, normalizedAPIError } from '../../api';
import MapContainer from '../../components/MapContainer';
import ZoneForm from './ZoneForm';
import ZoneStatusBadges from '../../components/zone-status-badges';

const ZonesHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">status</th>
    <th scope="col">note</th>
  </tr>
);

const defaultZone = {
  active: false,
  parking: false,
  note: '',
};

class Zones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zones: [],
      pages: 0,
      errors: {},
      zone: defaultZone,
    };

    this.loadZones = this.loadZones.bind(this);
    this.saveZone = this.saveZone.bind(this);
    this.zoneRow = this.zoneRow.bind(this);
  }

  async loadZones(page, search) {
    try {
      const response = await API({
        params: { page, search },
        method: 'get',
        url: '/zones',
      });

      const { zones, pages } = response.data;

      this.setState({ zones, pages });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  async saveZone(values, { setSubmitting, setErrors }) {
    setSubmitting(true);

    try {
      const zone = await API({
        data: values,
        method: 'post',
        url: '/zones',
      });

      this.setState({ zone });

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErrors(normalizedAPIError(error));
    }
  }

  zoneRow(zone) {
    const { _id, note } = zone;

    return (
      <tr
        key={_id}
        onClick={() => {
          this.setState({ zone });
        }}
      >
        <td>{_id}</td>
        <td>
          <ZoneStatusBadges zone={zone} />
        </td>
        <td>{note}</td>
      </tr>
    );
  }

  render() {
    const { isAdmin } = this.props.user;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="10">
            <Card style={{ height: '600px' }}>
              <MapContainer zones={this.state.zones} />
            </Card>

            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                Zones
                {isAdmin && (
                  <div className="float-right">
                    <Button
                      color="primary"
                      onClick={() => {
                        this.setState({ zone: defaultZone });
                      }}
                    >
                      Add Zone
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchPlaceholder="search for note"
                  items={this.state.zones}
                  pages={this.state.pages}
                  loadItemsForPage={this.loadZones}
                  headerComponent={ZonesHeader}
                  rowComponent={this.zoneRow}
                />
              </CardBody>

              {!_.isEmpty(this.state.errors.message) && (
                <CardFooter>
                  <Alert color="danger">{this.state.errors.message}</Alert>
                </CardFooter>
              )}
            </Card>
          </Col>

          <Col md="2">
            <Formik
              render={ZoneForm}
              initialValues={this.state.zone}
              validationSchema={yup.object().shape({
                vehicleCode: yup.string().required(),
                iotCode: yup.string().required(),
              })}
              onSubmit={this.handleSaveZone}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Zones);
