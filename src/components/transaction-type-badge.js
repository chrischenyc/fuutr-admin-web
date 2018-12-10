import React from 'react';
import { Badge } from 'reactstrap';

const TransactionTypeBadge = (props) => {
  const {
    transaction: { type },
  } = props;

  if (type === 'top-up') {
    return <Badge color="success">top up</Badge>;
  }

  if (type === 'ride') {
    return <Badge color="danger">ride</Badge>;
  }

  if (type === 'coupon') {
    return <Badge color="success">coupon</Badge>;
  }

  if (type === 'credit') {
    return <Badge color="success">credit</Badge>;
  }

  return <Badge color="info">unknown</Badge>;
};

export default TransactionTypeBadge;
