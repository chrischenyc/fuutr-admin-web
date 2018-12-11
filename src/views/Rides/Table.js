import React from 'react';
import { Link } from 'react-router-dom';

import priceString from '../../utils/format-price';
import { shortenedId } from '../../utils/trunc-string';
import distanceString from '../../utils/format-distance';
import durationString from '../../utils/format-duration';
import { dateTimeString } from '../../utils/format-date';

import VehicleBadge from '../../components/vehicle-status-badge';

export const RidesHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">user</th>
    <th scope="col">vehicle</th>
    <th scope="col">duration</th>
    <th scope="col">distance</th>
    <th scope="col">total</th>
    <th scope="col">time</th>
    <th scope="col">status</th>
  </tr>
);

export const RideRow = (ride) => {
  const {
    _id, user, scooter, duration, distance, totalCost, createdAt,
  } = ride;

  const rideLink = `/rides/${_id}`;
  const userLink = `/users/${user}`;
  const vehicleLink = `/vehicle/${scooter}`;

  return (
    <tr key={_id}>
      <td>
        <Link to={rideLink}>{shortenedId(_id)}</Link>
      </td>
      <td>
        <Link to={userLink}>{shortenedId(user)}</Link>
      </td>
      <td>
        <Link to={vehicleLink}>{shortenedId(scooter)}</Link>
      </td>
      <td>{durationString(duration)}</td>
      <td>{distanceString(distance)}</td>
      <td>{priceString(totalCost)}</td>
      <td>{dateTimeString(createdAt)}</td>
      <td>
        <VehicleBadge ride={ride} />
      </td>
    </tr>
  );
};
