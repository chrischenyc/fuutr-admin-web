import React from 'react';
import {
  Button, Form, FormText, FormFeedback, Input, FormGroup, Row, Col,
} from 'reactstrap';
import { Field } from 'formik';
import _ from 'lodash';

const ContactForm = ({
  handleSubmit, errors, isSubmitting, touched, isValid,
}) => (
  <Form onSubmit={handleSubmit}>
    <Row form>
      <Col md={4}>
        <FormGroup>
          <Input
            tag={Field}
            type="text"
            name="name"
            placeholder="name"
            disabled={isSubmitting}
            invalid={touched.name && !_.isEmpty(errors.name)}
          />

          {errors.name && touched.name && <FormFeedback>{errors.name}</FormFeedback>}
        </FormGroup>
      </Col>

      <Col md={4}>
        <FormGroup>
          <Input
            tag={Field}
            type="text"
            name="phone"
            placeholder="phone"
            disabled={isSubmitting}
            invalid={touched.phone && !_.isEmpty(errors.phone)}
          />

          {errors.phone && touched.phone && <FormFeedback>{errors.phone}</FormFeedback>}
        </FormGroup>
      </Col>

      <Col md={4}>
        <FormGroup>
          <Input
            tag={Field}
            type="email"
            name="email"
            placeholder="email"
            disabled={isSubmitting}
            invalid={touched.email && !_.isEmpty(errors.email)}
          />

          {errors.email && touched.email && <FormFeedback>{errors.email}</FormFeedback>}
        </FormGroup>
      </Col>
    </Row>

    <Row form>
      <Col md={12}>
        <FormGroup>
          <Input
            tag={Field}
            component="textarea"
            rows="6"
            name="message"
            placeholder="message"
            disabled={isSubmitting}
            invalid={touched.message && !_.isEmpty(errors.message)}
          />

          {errors.message && touched.message && <FormFeedback>{errors.message}</FormFeedback>}
        </FormGroup>
      </Col>
    </Row>

    <Button type="submit" color="primary" className="px-4" disabled={isSubmitting || !isValid}>
      Send
    </Button>

    {isSubmitting && <FormText color="muted">submitting...</FormText>}

    {errors.submit && <FormText color="danger">{errors.submit}</FormText>}
  </Form>
);

export default ContactForm;
