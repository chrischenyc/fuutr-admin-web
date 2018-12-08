import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';

class User extends Component {
  render() {
    const userDetails = [
      [
        'id',
        <span>
          <i className="text-muted icon-ban" />
          Not found
        </span>,
      ],
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  User id:
                  {this.props.match.params.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {userDetails.map(([key, value]) => (
                      <tr key={key}>
                        <td>{`${key}:`}</td>
                        <td>
                          <strong>{value}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
