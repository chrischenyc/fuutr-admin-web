import React from 'react';
import { Link } from 'react-router-dom';

import { shortenedId } from '../../utils/trunc-string';
import { dateTimeString } from '../../utils/format-date';
import {
  issueLink, userLink, vehicleLink, rideLink,
} from '../../utils/links';
import IssueStatusBadges from '../../components/issue-status-badges';

export const IssuesHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">user</th>
    <th scope="col">time</th>
    <th scope="col">description</th>
    <th scope="col">vehicle</th>
    <th scope="col">ride</th>
    <th scope="col">status</th>
  </tr>
);

export const IssueRow = (issue) => {
  const {
    _id, user, vehicle, ride, createdAt, description,
  } = issue;

  return (
    <tr key={_id}>
      <td>
        <Link to={issueLink(_id)}>{shortenedId(_id)}</Link>
      </td>
      <td>
        <Link to={userLink(user)}>{shortenedId(user)}</Link>
      </td>
      <td>{dateTimeString(createdAt)}</td>
      <td>{description}</td>
      <td>{vehicle && <Link to={vehicleLink(vehicle)}>{shortenedId(vehicle)}</Link>}</td>
      <td>{ride && <Link to={rideLink(ride)}>{shortenedId(ride)}</Link>}</td>
      <td>
        <IssueStatusBadges issue={issue} />
      </td>
    </tr>
  );
};
