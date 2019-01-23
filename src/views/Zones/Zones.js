import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, CardFooter, Alert, Row, Col,
} from 'reactstrap';
import _ from 'lodash';
import { Formik } from 'formik';
import * as yup from 'yup';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { API, normalizedAPIError } from '../../api';
import { ZonesHeader, ZoneRow } from './Table';
import MapContainer from '../../components/MapContainer';
import ZoneForm from './ZoneForm';

class Zones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zones: [],
      pages: 0,
      errors: {},
    };

    this.loadZones = this.loadZones.bind(this);
    this.saveZone = this.saveZone.bind(this);
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
      await API({
        data: values,
        method: 'post',
        url: '/zones',
      });

      setSubmitting(false);

      this.setState({ redirectToVehicles: true });
    } catch (error) {
      setSubmitting(false);
      setErrors(normalizedAPIError(error));
    }
  }

  render() {
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
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchPlaceholder="search for note"
                  items={this.state.zones}
                  pages={this.state.pages}
                  loadItemsForPage={this.loadZones}
                  headerComponent={ZonesHeader}
                  rowComponent={ZoneRow}
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
              initialValues={{ vehicleCode: '', iotCode: '' }}
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

export default Zones;
