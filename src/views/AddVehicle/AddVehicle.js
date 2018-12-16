import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';

import {
  Card, CardBody, CardHeader, Row, Col,
} from 'reactstrap';

import AddVehicleForm from './AddVehicleForm';
import { API, normalizedAPIError } from '../../api';

class AddVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToVehicles: false,
    };

    this.handleAddVehicle = this.handleAddVehicle.bind(this);
  }

  async handleAddVehicle(values, { setSubmitting, setErrors }) {
    setSubmitting(true);

    try {
      await API({
        data: values,
        method: 'post',
        url: '/vehicles',
      });

      setSubmitting(false);

      this.setState({ redirectToVehicles: true });
    } catch (error) {
      setSubmitting(false);
      setErrors(normalizedAPIError(error));
    }
  }

  render() {
    const { redirectToVehicles } = this.state;
    if (redirectToVehicles === true) {
      return <Redirect to="/vehicles" />;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                Add Vehicles
              </CardHeader>

              <CardBody>
                <Formik
                  render={AddVehicleForm}
                  initialValues={{ vehicleCode: '', iotCode: '' }}
                  validationSchema={yup.object().shape({
                    vehicleCode: yup.string().required(),
                    iotCode: yup.string().required(),
                  })}
                  onSubmit={this.handleAddVehicle}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddVehicle;
