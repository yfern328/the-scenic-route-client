import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import { withGoogleMap, GoogleMap, DirectionsRenderer, InfoWindow, Marker } from "react-google-maps";
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"

class Map extends Component {
  render() {

    // console.log(this.props)

    const AsyncGettingStartedExampleGoogleMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { this.props.center }
        defaultZoom = { this.props.zoom }
        onRightClick={ this.props.handleMapClicks }
      >

      {this.props.spots.map( (spot, index) => {
          return (
            <Marker
              key={ index }
              position={ { lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude) } }
              onClick={ () => this.props.onSpotClick(spot) }
              markers={this.markers}
            >
              {spot.showInfo &&
                <InfoWindow width='10px' onCloseClick={ () => this.props.onSpotClick(spot) }>
                  <div>
                    <p>{ spot.name }</p>
                    <img height='200px' width='200px' src={ spot.image_url } alt={ spot.name } /> <br/>
                    <p>{ spot.description }</p>
                    <button onClick={ () => this.props.addSpotToRoute(spot) }>Add To Route</button>
                  </div>
              </InfoWindow>
              }
            </Marker>
          )
        })
      }

      { this.props.directions &&
        <DirectionsRenderer
          directions = { this.props.directions }
          options = { { draggable: true } }
          ref = { this.props.directionsRef }
          onDirectionsChanged = { this.props.getNewDirections }
        />
      }

      </GoogleMap>
    )));

    return(
      <div>
        <AsyncGettingStartedExampleGoogleMap
          containerElement = { <div className="container-element" style={ { height: '50vh', width: '50vw' } } /> }
          googleMapURL = { googleMapURL }
          loadingElement={ <div className="loading-element" style={ { height: `50vh`, width: '50vw' } } /> }
          mapElement = { <div className="map-element" style={ { height: '45vh', width: '45vw' } } /> }
        />
      </div>
    );

  }
};

export default Map;
