import React from 'react';
import { Link } from 'react-router-dom';

import priceString from '../../utils/format-price';
import { shortenedId } from '../../utils/trunc-string';
import distanceString from '../../utils/format-distance';
import durationString from '../../utils/format-duration';
import { dateTimeString } from '../../utils/format-date';
import { rideLink, userLink, vehicleLink } from '../../utils/links';

import RideStatusBadge from '../../components/ride-status-badge';

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

  return (
    <tr key={_id}>
      <td>
        <Link to={rideLink(_id)}>{shortenedId(_id)}</Link>
      </td>
      <td>
        <Link to={userLink(user)}>{shortenedId(user)}</Link>
      </td>
      <td>
        <Link to={vehicleLink(scooter)}>{shortenedId(scooter)}</Link>
      </td>
      <td>{durationString(duration)}</td>
      <td>{distanceString(distance)}</td>
      <td>{priceString(totalCost)}</td>
      <td>{dateTimeString(createdAt)}</td>
      <td>
        <RideStatusBadge ride={ride} />
      </td>
    </tr>
  );
};
