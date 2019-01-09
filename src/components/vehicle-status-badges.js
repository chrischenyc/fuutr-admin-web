import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';
import _ from 'lodash';

const VehicleStatusBadges = (props) => {
  const {
    vehicle: {
      online, locked, charging, powerPercent, networkSignal,
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
      {!_.isNil(powerPercent) && <Badge color="warning">{`power ${powerPercent}%`}</Badge>}
      &nbsp;
      {!_.isNil(networkSignal) && <Badge color="success">{`network ${networkSignal}%`}</Badge>}
    </Fragment>
  );
};

export default VehicleStatusBadges;
