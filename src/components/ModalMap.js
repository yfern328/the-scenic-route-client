/* global google */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

class ModalMap extends Component {

  state = {
    directions: null
  }

  getDirections = () => {

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route( {
      origin: this.props.routeOrigin,
      destination: this.props.routeDestination,
      waypoints: this.props.routeWaypoints === [] ? null : this.props.routeWaypoints.map(waypoint => { return { location: waypoint, stopover: false } }),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({ directions: result }, () => console.log('MODAL MAP DIRECTIONS:', this.state.directions))
      }
      else {
        console.error(`error fetching directions ${result}`)
      }
    });

  }

  componentDidMount = () => {
    this.getDirections()
  }

  render() {

    const NOTAsyncGettingStartedExampleGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 13 }
      >

      { this.state.directions &&
        <DirectionsRenderer
          directions = { this.state.directions }
        />
      }

      </GoogleMap>
    ));

    return(
      <div>
        <NOTAsyncGettingStartedExampleGoogleMap
          containerElement = { <div className="modal-container-element" style={ { height: 'inherit', width: 'inherit' } } /> }
          mapElement = { <div className="modal-map-element" style={ { height: '50vh', width: '50vw' } } /> }
        />
      </div>
    );

  }
};

export default ModalMap;
