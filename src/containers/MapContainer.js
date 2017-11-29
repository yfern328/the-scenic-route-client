import React, { Component } from 'react';
import Map from '../components/Map'

class MapContainer extends Component {

  state = {
    defaultCenter: { lat: 40.756795, lng: -73.954298 },
    defaultZoom: 13
  }

  render(){

    return(
      <div className="map-container">
        <Map
          center = { this.state.defaultCenter }
          zoom = { this.state.defaultZoom }
          directions = { this.props.directions }
          spots = { this.props.spots }
          waypoints = { this.props.waypoints }
          getNewDirections = { this.props.getNewDirections }
          directionsRef = { this.props.directionsRef }
          handleMapClicks = { this.props.handleMapClicks }
          onSpotClick = { this.props.onSpotClick }
          addSpotToRoute = { this.props.addSpotToRoute }
        />
      </div>
    );
  }
};

export default MapContainer;
