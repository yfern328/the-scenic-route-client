import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const polyline = require( 'google-polyline' )
const API_URL = 'http://localhost:3010/api/v1';

class SpotModalMap extends Component {

  state = {
    spots: []
  }

  getSpots = () => {
    fetch(`${API_URL}/spots`)
    .then(resp => resp.json())
    .then(spots => spots.map(spot => {
      let newSpot = spot
      let decodedSpotPolyline = polyline.decode(spot.polyline)
      newSpot["latitude"] = decodedSpotPolyline[0][0]
      newSpot["longitude"] = decodedSpotPolyline[0][1]
      return newSpot
    }))
    .then(spots => this.setState( { spots }, () => console.log('GOT ALL SPOTS', this.state.spots)))
  }

  onSpotClick = (found_spot) => {
    // console.log('clicked my special spot', found_spot)
    let newSpots = this.state.spots.filter(spot => spot !== found_spot)
    found_spot.showInfo = !found_spot.showInfo
    newSpots.push(found_spot)
    // this.setState({ spots: newSpots }, () => console.log('ALL SPOTS', this.state.spots))
    this.setState({ spots: newSpots })
  }

  addSpotToRoute = (spot) => {
    // console.log(spot)
    this.setState({
      waypoints: [...this.state.waypoints, { lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude) }]
    }, () => {
      this.getDirections();
      this.onSpotClick(spot);
      })
  }


  componentDidMount = () => {
    this.getSpots()
    console.log(this.state)
  }

  render() {

    const NOTAsyncGettingStartedExampleGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 13 }
        onRightClick = {this.props.handleMapClicks}
      >

      {this.state.spots.map( (spot, index) => {
          return (
            <Marker
              key={ index }
              position={ { lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude) } }
              onClick={ () => this.onSpotClick(spot) }
              markers={this.markers}
            >
              {spot.showInfo &&
                <InfoWindow width='10px' onCloseClick={ () => this.onSpotClick(spot) }>
                  <div>
                    <p>{ spot.name }</p>
                    <img height='200px' width='200px' src={ spot.image_url } alt={ spot.name } /> <br/>
                    <p>{ spot.description }</p>
                    <button onClick={ () => this.addSpotToRoute(spot) }>Add To Route</button>
                  </div>
              </InfoWindow>
              }
            </Marker>
          )
        })
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

export default SpotModalMap;
