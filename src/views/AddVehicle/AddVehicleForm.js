import React from 'react';
import {
  Button, Form, FormText, FormFeedback, Input, FormGroup, Row, Col,
} from 'reactstrap';
import { Field } from 'formik';
import _ from 'lodash';

const AddVehicleForm = ({
  handleSubmit, errors, isSubmitting, touched,
}) => (
  <Form onSubmit={handleSubmit}>
    <Row form>
      <Col md={5}>
        <FormGroup>
          <Input
            tag={Field}
            type="text"
            name="vehicleCode"
            placeholder="vehicle code"
            disabled={isSubmitting}
            invalid={touched.vehicleCode && !_.isEmpty(errors.vehicleCode)}
          />

          {touched.vehicleCode && <FormFeedback>{errors.vehicleCode}</FormFeedback>}
        </FormGroup>
      </Col>
      <Col md={5}>
        <FormGroup>
          <Input
            tag={Field}
            type="text"
            name="iotCode"
            placeholder="IoT code"
            disabled={isSubmitting}
            invalid={touched.iotCode && !_.isEmpty(errors.iotCode)}
          />

          {touched.iotCode && <FormFeedback>{errors.iotCode}</FormFeedback>}
        </FormGroup>
      </Col>
    </Row>

    <Button type="submit" color="primary" className="px-4" disabled={isSubmitting}>
      Add Vehicle
    </Button>

    {isSubmitting && (
      <Col xs="12">
        <FormText color="muted">adding...</FormText>
      </Col>
    )}

    {errors.message && (
      <Col xs="12">
        <FormText color="danger">{errors.message}</FormText>
      </Col>
    )}
  </Form>
);

export default AddVehicleForm;
