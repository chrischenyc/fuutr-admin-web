import React from 'react';
import {
  Button,
  Col,
  Form,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { Field } from 'formik';
import _ from 'lodash';

const LoginForm = ({
  handleSubmit, errors, isSubmitting, touched,
}) => (
  <Form onSubmit={handleSubmit}>
    <h1>OTG Ride Admin</h1>

    <p className="text-muted">
      Sign In with your OTG Rider account. If you forgot password, please reset it by using OTG
      Rider app.
    </p>

    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-user" />
        </InputGroupText>
      </InputGroupAddon>

      <Input
        tag={Field}
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        disabled={isSubmitting}
        invalid={touched.email && !_.isEmpty(errors.email)}
      />

      {touched.email && <FormFeedback>{errors.email}</FormFeedback>}
    </InputGroup>

    <InputGroup className="mb-4">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-lock" />
        </InputGroupText>
      </InputGroupAddon>

      <Input
        tag={Field}
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        disabled={isSubmitting}
        invalid={touched.password && !_.isEmpty(errors.password)}
      />

      {touched.password && <FormFeedback>{errors.password}</FormFeedback>}
    </InputGroup>

    <Row>
      <Col xs="12">
        <Button type="submit" color="primary" className="px-4" block disabled={isSubmitting}>
          Login
        </Button>
      </Col>
    </Row>

    <Row>
      {isSubmitting && (
        <Col xs="12">
          <FormText color="muted">logging you in...</FormText>
        </Col>
      )}

      {errors.message && (
        <Col xs="12">
          <FormText color="danger">{errors.message}</FormText>
        </Col>
      )}
    </Row>
  </Form>
);

export default LoginForm;
