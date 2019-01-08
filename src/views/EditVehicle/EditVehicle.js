import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';

import {
  Card, CardBody, CardHeader, Row, Col,
} from 'reactstrap';

import EditVehicleForm from './EditVehicleForm';
import { API, normalizedAPIError } from '../../api';

class EditVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicle: null,
      redirectToVehicle: false,
    };

    this.loadVehicle = this.loadVehicle.bind(this);
    this.handleEditVehicle = this.handleEditVehicle.bind(this);
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

  async handleEditVehicle(values, { setSubmitting, setErrors }) {
    setSubmitting(true);

    try {
      const { _id } = this.props.match.params;

      await API({
        data: values,
        method: 'patch',
        url: `/vehicles/${_id}`,
      });

      setSubmitting(false);

      this.setState({ redirectToVehicle: true });
    } catch (error) {
      setSubmitting(false);
      setErrors(normalizedAPIError(error));
    }
  }

  render() {
    const { redirectToVehicle } = this.state;
    if (redirectToVehicle === true) {
      const { _id } = this.props.match.params;
      return <Redirect to={`/vehicles/${_id}`} />;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                Edit Vehicles
              </CardHeader>

              <CardBody>
                {!this.state.vehicle && 'loading...'}
                {this.state.vehicle && (
                  <Formik
                    render={EditVehicleForm}
                    initialValues={{
                      vehicleCode: this.state.vehicle.vehicleCode,
                      iotCode: this.state.vehicle.iotCode,
                    }}
                    validationSchema={yup.object().shape({
                      vehicleCode: yup.string().required(),
                      iotCode: yup.string().required(),
                    })}
                    onSubmit={this.handleEditVehicle}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditVehicle;
