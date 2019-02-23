import React, { Component } from 'react';

import {
  Card, CardBody, CardHeader, CardFooter, Col, Row, Alert,
} from 'reactstrap';
import _ from 'lodash';

import PaginationTable from '../../containers/PaginationTable/PaginationTable';
import { IssuesHeader, IssueRow } from './Table';

import { API, normalizedAPIError } from '../../api';

class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      pages: 0,
      errors: {},
    };

    this.loadIssues = this.loadIssues.bind(this);
  }

  async loadIssues(page, search) {
    try {
      const response = await API({
        params: { page, search },
        method: 'get',
        url: '/issues',
      });

      const { issues, pages } = response.data;

      this.setState({ issues, pages });
    } catch (error) {
      this.setState({ errors: normalizedAPIError(error) });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                Issues
              </CardHeader>

              <CardBody>
                <PaginationTable
                  searchable={false}
                  items={this.state.issues}
                  pages={this.state.pages}
                  loadItemsForPage={this.loadIssues}
                  headerComponent={IssuesHeader}
                  rowComponent={IssueRow}
                />
              </CardBody>

              <CardFooter>
                {!_.isEmpty(this.state.errors.message) && (
                  <Alert color="danger">{this.state.errors.message}</Alert>
                )}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Issues;
