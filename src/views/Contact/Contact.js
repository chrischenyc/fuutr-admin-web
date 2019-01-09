import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Card, CardBody, CardHeader, Row, Col,
} from 'reactstrap';

import ContactForm from './ContactForm';
import { API, normalizedAPIError } from '../../api';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values, { setSubmitting, setErrors }) {
    setSubmitting(true);

    try {
      await API({
        data: values,
        method: 'post',
        url: '/contacts',
      });

      setSubmitting(false);

      this.setState({ submitted: true });
    } catch (error) {
      setSubmitting(false);
      setErrors(normalizedAPIError(error));
    }
  }

  render() {
    const { submitted } = this.state;

    if (submitted === true) {
      return (
        <div className="animated fadeIn">
          <h3>thanks, we will get back to you shortly!</h3>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="6">
            <Card>
              <CardHeader>Contact FUUTR</CardHeader>

              <CardBody>
                <Formik
                  render={ContactForm}
                  validationSchema={yup.object().shape({
                    name: yup.string().required(),
                    phone: yup.string().required(),
                    email: yup
                      .string()
                      .email()
                      .required(),
                    message: yup.string().required(),
                  })}
                  onSubmit={this.handleSubmit}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Contact;
