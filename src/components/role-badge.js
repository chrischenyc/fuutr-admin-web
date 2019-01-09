import React from 'react';
import { Badge } from 'reactstrap';

const RoleBadge = (props) => {
  const { user } = props;

  if (user.isAdmin) {
    return <Badge color="danger">Admin</Badge>;
  }
  if (user.isCouncil) {
    return <Badge color="primary">Council</Badge>;
  }

  return <Badge color="success">User</Badge>;
};

export default RoleBadge;
