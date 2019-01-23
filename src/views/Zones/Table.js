import React from 'react';

import ZoneStatusBadges from '../../components/zone-status-badges';

export const ZonesHeader = () => (
  <tr>
    <th scope="col">id</th>
    <th scope="col">status</th>
    <th scope="col">note</th>
  </tr>
);

export const ZoneRow = (zone) => {
  const { _id, note } = zone;

  return (
    <tr key={_id}>
      <td>{_id}</td>
      <td>
        <ZoneStatusBadges zone={zone} />
      </td>
      <td>{note}</td>
    </tr>
  );
};
