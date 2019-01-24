import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, CardFooter, Alert, Row, Col, Button, Modal, ModalBody, ModalFooter,
} from 'reactstrap';
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
    <th scope="col">manage</th>
  </tr>
);

const defaultZone = {
  active: true,
  parking: true,
  speedMode: 0,
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
      zoneToDelete: null,
    };

    this.loadZones = this.loadZones.bind(this);
    this.saveZone = this.saveZone.bind(this);
    this.deleteZone = this.deleteZone.bind(this);
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
      const { _id } = values;

      let response;

      if (_id) {
        // update
        response = await API({
          data: values,
          method: 'patch',
          url: `/zones/${_id}`,
        });
      } else {
        // create
        response = await API({
          data: values,
          method: 'post',
          url: '/zones',
        });
      }

      const { data: zone } = response;

      this.setState({ zone });

      setSubmitting(false);

      // TODO: reload table with current page
      this.loadZones(0);
    } catch (error) {
      setSubmitting(false);
      setErrors(normalizedAPIError(error));
    }
  }

  async deleteZone() {
    try {
      const { _id } = this.state.zoneToDelete;

      await API({
        method: 'delete',
        url: `/zones/${_id}`,
      });

      this.setState({ zoneToDelete: null });
      // TODO: reload table with current page
      this.loadZones(0);
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error), zoneToDelete: null });
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

        <td>
          <Button
            color="danger"
            onClick={() => {
              this.setState({ zoneToDelete: zone });
            }}
          >
            delete
          </Button>
        </td>

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
              enableReinitialize
              initialValues={this.state.zone}
              validationSchema={yup.object().shape({
                active: yup.bool().required(),
                parking: yup.bool().required(),
                speedMode: yup.number().required(),
                note: yup.string().notRequired(),
              })}
              onSubmit={this.saveZone}
            />
          </Col>
        </Row>

        <Modal isOpen={this.state.zoneToDelete}>
          <ModalBody>
            Delete this zone?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteZone}>Delete</Button>
            {' '}
            <Button
              color="secondary"
              onClick={() => {
                this.setState({ zoneToDelete: null });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Zones);
