import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import VehicleStatusBadges from './vehicle-status-badges';

const markerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '18px',
  height: '18px',
  backgroundColor: '#DA3732',
  border: '2px solid #fff',
  borderRadius: '100%',
  userSelect: 'none',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
};

const GoogleMapVehicleMarker = props => (
  <div
    style={markerStyle}
    onClick={() => {
      props.onClick(props.vehicle);
    }}
    data-tip
    data-for={props.vehicle._id}
  >
    <ReactTooltip id={props.vehicle._id} effect="solid">
      {props.vehicle.vehicleCode}
      <br />
      <br />
      <VehicleStatusBadges vehicle={props.vehicle} />
    </ReactTooltip>
  </div>
);

GoogleMapVehicleMarker.propTypes = {
  onClick: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired,
};

export default GoogleMapVehicleMarker;
