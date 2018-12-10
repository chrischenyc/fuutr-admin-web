import React from 'react';
import { Badge } from 'reactstrap';

const VehicleStatusBadge = (props) => {
  const { ride } = props;

  if (ride.completed) {
    return <Badge color="success">Completed</Badge>;
  }

  if (ride.paused) {
    return <Badge color="warning">Paused</Badge>;
  }

  return <Badge color="info">Riding</Badge>;
};

export default VehicleStatusBadge;
