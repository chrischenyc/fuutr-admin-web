import React from 'react';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import _ from 'lodash';

const LoginForm = ({
  handleSubmit, errors, isSubmitting, setTouched, touched,
}) => (
  <Form>
    <h1>OTG Ride Admin</h1>

    <p className="text-muted">Sign In with your OTG Ride account</p>

    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-user" />
        </InputGroupText>
      </InputGroupAddon>

      <Input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        invalid={!_.isEmpty(errors.email)}
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
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        invalid={!_.isEmpty(errors.password)}
      />

      {touched.password && <FormFeedback>{errors.password}</FormFeedback>}
    </InputGroup>

    <Row>
      <Col xs="12">
        <Button
          type="submit"
          color="primary"
          className="px-4"
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Login
        </Button>
      </Col>
    </Row>
  </Form>
);

export default LoginForm;
