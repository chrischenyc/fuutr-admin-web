import React from 'react';
import { Link } from 'react-router-dom';

import priceString from '../../utils/format-price';
import { shortenedId } from '../../utils/trunc-string';
import { dateTimeString } from '../../utils/format-date';
import { paymentLink, userLink } from '../../utils/links';

export const PaymentsHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">user</th>
    <th scope="col">amount</th>
    <th scope="col">description</th>
    <th scope="col">time</th>
  </tr>
);

export const PaymentRow = (payment) => {
  const {
    _id, user, amount, description, createdAt,
  } = payment;

  return (
    <tr key={_id}>
      <td>
        <Link to={paymentLink(_id)}>{shortenedId(_id)}</Link>
      </td>
      <td>
        <Link to={userLink(user)}>{shortenedId(user)}</Link>
      </td>
      <td>{priceString(amount)}</td>
      <td>{description}</td>
      <td>{dateTimeString(createdAt)}</td>
    </tr>
  );
};
