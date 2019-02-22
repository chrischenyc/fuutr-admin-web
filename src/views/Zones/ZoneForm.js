import React from 'react';
import {
  Button, Form, FormText, FormFeedback, Input, FormGroup, Col, Label,
} from 'reactstrap';
import _ from 'lodash';
import speedModeString from '../../utils/format-speed-mode';

const ZoneForm = ({
  handleSubmit,
  errors,
  isSubmitting,
  touched,
  values,
  handleChange,
  isValid,
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup check style={{ marginBottom: '0.5em' }}>
      <Label check>
        <Input type="checkbox" name="active" checked={values.active} onChange={handleChange} />
        {' '}
        Active
      </Label>
    </FormGroup>

    <FormGroup check style={{ marginBottom: '0.5em' }}>
      <Label check>
        <Input type="checkbox" name="riding" checked={values.riding} onChange={handleChange} />
        {' '}
        Allow Riding
      </Label>
    </FormGroup>

    <FormGroup check style={{ marginBottom: '0.5em' }}>
      <Label check>
        <Input
          type="checkbox"
          name="parking"
          checked={values.riding && values.parking}
          onChange={handleChange}
        />
        {' '}
        Allow Parking
      </Label>
    </FormGroup>

    <FormGroup>
      <Label for="speedMode">Speed Limit</Label>
      <Input
        type="select"
        name="speedMode"
        id="speedMode"
        value={values.riding ? values.speedMode : 1}
        onChange={handleChange}
      >
        <option value="0">{speedModeString(0)}</option>
        <option value="1">{speedModeString(1)}</option>
        <option value="2">{speedModeString(2)}</option>
        <option value="3">{speedModeString(3)}</option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Input
        type="text"
        name="note"
        placeholder="note (optional)"
        disabled={isSubmitting}
        invalid={touched.note && !_.isEmpty(errors.note)}
        value={values.note}
        onChange={handleChange}
      />

      {touched.note && <FormFeedback>{errors.note}</FormFeedback>}
    </FormGroup>

    <Button type="submit" color="primary" className="px-4" disabled={!isValid || isSubmitting}>
      {values._id ? 'Update' : 'Create'}
    </Button>

    {isSubmitting && (
      <Col xs="12">
        <FormText color="muted">saving...</FormText>
      </Col>
    )}

    {errors.message && (
      <Col xs="12">
        <FormText color="danger">{errors.message}</FormText>
      </Col>
    )}
  </Form>
);

export default ZoneForm;
