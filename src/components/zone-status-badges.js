import React, { Fragment } from 'react';
import { Badge } from 'reactstrap';
import _ from 'lodash';

import speedModeString from '../utils/format-speed-mode';

const ZoneStatusBadges = (props) => {
  const {
    zone: { active, parking, speedMode },
  } = props;

  return (
    <Fragment>
      {active && <Badge color="success">active</Badge>}
      {!active && <Badge color="danger">inactive</Badge>}
      &nbsp;
      {parking && <Badge color="success">parking</Badge>}
      {!parking && <Badge color="danger">non-parking</Badge>}
      &nbsp;
      {!_.isNil(speedMode) && <Badge color="warning">{speedModeString(speedMode)}</Badge>}
    </Fragment>
  );
};

export default ZoneStatusBadges;
