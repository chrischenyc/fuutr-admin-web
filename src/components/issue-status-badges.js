import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';

const IssueStatusBadges = (props) => {
  const { issue } = props;

  return (
    <Fragment>
      <Badge color="info">{issue.type}</Badge>
      &nbsp;
      {issue.status === 'new' && <Badge color="warning">New</Badge>}
      {issue.status === 'solved' && <Badge color="success">Solved</Badge>}
      {issue.status === 'escalated' && <Badge color="danger">Escalated</Badge>}
    </Fragment>
  );
};

export default IssueStatusBadges;
