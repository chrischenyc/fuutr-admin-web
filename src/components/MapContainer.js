import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';

import { vehicleLink } from '../utils/links';
import VehicleStatusBadges from './vehicle-status-badges';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: null,
      selectedVehicle: null,
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onMarkerClick(props, marker) {
    this.setState({
      selectedVehicle: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onClose() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  render() {
    const { vehicles } = this.props;
    const { selectedVehicle, activeMarker, showingInfoWindow } = this.state;

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -37.8136,
          lng: 144.9631,
        }}
      >
        {/* display vehicle markers */}
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle._id}
            position={{
              lat: vehicle.location.coordinates[1],
              lng: vehicle.location.coordinates[0],
            }}
            icon="/assets/img/scooter.png"
            onClick={this.onMarkerClick}
            name={`vehicle ${vehicle.vehicleCode}`}
            {...vehicle}
          />
        ))}

        {/* display info popover for selected vehicle */}
        {selectedVehicle && (
          <InfoWindow marker={activeMarker} visible={showingInfoWindow} onClose={this.onClose}>
            <div>
              <h4>{selectedVehicle.name}</h4>
              <VehicleStatusBadges vehicle={selectedVehicle} />
              <br />
              <br />
              <div>
                <a href={vehicleLink(selectedVehicle._id)}>details</a>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
})(MapContainer);
