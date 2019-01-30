import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import uuid from 'uuid';

import GoogleMapVehicleMarker from './GoogleMapVehicleMark';

const zoneToGoogleMapPolygon = (google, zone) => {
  const coordinates = zone.polygon.coordinates[0];
  coordinates.pop(); // google map doesn't require first node to be repeated as the last node

  const paths = coordinates.map(coordinate => ({
    lat: coordinate[1],
    lng: coordinate[0],
  }));

  let color;

  if (!zone.parking) {
    color = '#FF0000';
  } else {
    switch (zone.speedMode) {
      case 1:
        color = '#EE6F2D';
        break;

      case 2:
        color = '#42aaf4';
        break;

      case 3:
        color = '#34a84b';
        break;

      default:
        break;
    }
  }

  const zonePolygon = new google.maps.Polygon({
    paths,
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 0.2,
    fillColor: color,
    fillOpacity: 0.3,
  });

  return zonePolygon;
};

class GoogleMapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      google: null,
      mapKey: uuid.v4(), // update key to force reload google map, not ideal
    };

    this.renderOnGoogleMap = this.renderOnGoogleMap.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.zones !== this.props.zones && this.state.google) {
      // this.renderOnGoogleMap(this.state.google);
      this.setState({ mapKey: uuid.v4() });
    }
  }

  renderOnGoogleMap(google) {
    const { zoneEditing, zones, onPolygonComplete } = this.props;

    if (zoneEditing) {
      // enable polygon drawing
      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: false,
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        polygonOptions: {
          draggable: true,
          editable: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
        },
      });

      drawingManager.setMap(google.map);

      google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        drawingManager.setDrawingMode(null);

        const coordinates = [];
        polygon.getPath().forEach((latLng) => {
          coordinates.push([latLng.lng(), latLng.lat()]);
        });

        onPolygonComplete(coordinates);
      });
    }

    // TODO: clear current polygons

    // iterate all the zones to add their polygons to map
    if (zones) {
      zones
        .filter(zone => zone.active)
        .forEach((zone) => {
          const zonePolygon = zoneToGoogleMapPolygon(google, zone);
          zonePolygon.setMap(google.map);
        });
    }
  }

  render() {
    const { vehicles, onVehicleClicked } = this.props;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          key={this.state.mapKey}
          defaultCenter={{
            lat: parseFloat(process.env.REACT_APP_GOOGLE_MAP_DEFAULT_CENTER_LAT),
            lng: parseFloat(process.env.REACT_APP_GOOGLE_MAP_DEFAULT_CENTER_LNG),
          }}
          defaultZoom={parseFloat(process.env.REACT_APP_GOOGLE_MAP_DEFAULT_ZOOM)}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={(google) => {
            this.setState({ google });
            this.renderOnGoogleMap(google);
          }}
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
