import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import GoogleMapVehicleMarker from './GoogleMapVehicleMark';

class GoogleMapContainer extends Component {
  render() {
    const { vehicles, onVehicleClicked } = this.props;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={{ lat: -37.8136, lng: 144.9631 }}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{
            libraries: 'drawing',
            key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
          }}
        >
          {/* display vehicle markers */}
          {vehicles
            && vehicles.map(vehicle => (
              <GoogleMapVehicleMarker
                key={vehicle._id}
                lat={vehicle.location.coordinates[1]}
                lng={vehicle.location.coordinates[0]}
                vehicle={vehicle}
                onClick={onVehicleClicked}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapContainer;
