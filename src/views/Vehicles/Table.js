import React from 'react';
import { Link } from 'react-router-dom';

import { shortenedId } from '../../utils/trunc-string';
import distanceString from '../../utils/format-distance';
import { vehicleLink } from '../../utils/links';

import VehicleStatusBadges from '../../components/vehicle-status-badges';

export const VehiclesHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">Unlock Code</th>
    <th scope="col">IoT code</th>
    <th scope="col">vehicle code</th>
    <th scope="col">Range</th>
    <th scope="col">status</th>
  </tr>
);

export const VehicleRow = (vehicle) => {
  const {
    _id, unlockCode, iotCode, vehicleCode, remainingRange,
  } = vehicle;

  return (
    <tr key={_id}>
      <td>
        <Link to={vehicleLink(_id)}>{shortenedId(_id)}</Link>
      </td>
      <td>{unlockCode}</td>
      <td>{iotCode}</td>
      <td>{vehicleCode}</td>
      <td>{distanceString(remainingRange)}</td>
      <td>
        <VehicleStatusBadges vehicle={vehicle} />
      </td>
    </tr>
  );
};
