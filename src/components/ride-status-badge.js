import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';
import Rating from 'react-star-rating-component';

const RideStatusBadge = (props) => {
  const { ride } = props;

  return (
    <Fragment>
      {ride.completed && <Badge color="success">Completed</Badge>}
      {ride.paused && <Badge color="warning">Paused</Badge>}
      &nbsp;
      {ride.rating && <Rating editing={false} value={ride.rating} />}
    </Fragment>
  );
};

export default RideStatusBadge;
