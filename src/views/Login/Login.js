import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Card, CardBody, CardGroup, Col, Container, Row,
} from 'reactstrap';

import LoginForm from './LoginForm';

class Login extends Component {
  handleEmailSignIn() {
    console.log('login');
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Formik
                      render={LoginForm}
                      initialValues={{ email: '', password: '' }}
                      validationSchema={yup.object().shape({
                        email: yup
                          .string()
                          .email()
                          .required(),
                        password: yup
                          .string()
                          .min(6)
                          .required(),
                      })}
                      onSubmit={(values, { setSubmitting, setErrors }) => {
                        setTimeout(() => {
                          setSubmitting(false);
                          setErrors({
                            message: 'API not integrated',
                          });
                        }, 4000);
                      }}
                    />
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
