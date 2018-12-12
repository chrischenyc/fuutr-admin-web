import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';

const VehicleStatusBadges = (props) => {
  const {
    vehicle: {
      online, locked, charging, powerPercent,
    },
  } = props;

  return (
    <Fragment>
      {online && <Badge color="success">online</Badge>}
      {!online && <Badge color="danger">offline</Badge>}
      &nbsp;
      {locked && <Badge color="info">locked</Badge>}
      {!locked && <Badge color="success">unlocked</Badge>}
      &nbsp;
      {charging && <Badge color="warning">charging</Badge>}
      &nbsp;
      {powerPercent && <Badge color="warning">{`power ${powerPercent}%`}</Badge>}
    </Fragment>
  );
};

export default VehicleStatusBadges;
