import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  Card, CardBody, CardGroup, Col, Container, Row,
} from 'reactstrap';

import LoginForm from './LoginForm';
import { API, normalizedAPIError } from '../../api';
import { userSignedIn } from '../../store/user';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
    };

    this.handleEmailSignIn = this.handleEmailSignIn.bind(this);
  }

  async handleEmailSignIn(values, { setSubmitting, setErrors }) {
    setSubmitting(true);

    try {
      const response = await API({
        data: values,
        method: 'post',
        url: '/auth/email-login',
      });

      setSubmitting(false);

      this.props.userSignedIn(response.data);
      this.setState({ redirectToReferrer: true });
    } catch (error) {
      setSubmitting(false);
      setErrors(normalizedAPIError(error));
    }
  }

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />;
    }

    const from = (this.props.location.state && this.props.location.state.from) || '/';

    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

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
                        password: yup.string().required(),
                      })}
                      onSubmit={this.handleEmailSignIn}
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

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export default connect(
  mapStateToProps,
  { userSignedIn },
)(Login);
