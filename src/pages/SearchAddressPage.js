/* global google */

import React, { Component } from 'react';
import MapContainer from '../containers/MapContainer'
import AddressForm from '../components/AddressForm'
import SaveRouteModal from '../components/SaveRouteModal'
import AddSpotModal from '../components/AddSpotModal'
import NavBar from '../components/NavBar'

const geocoder = require('google-geocoder')
const polyline = require( 'google-polyline' )
const API_URL = 'http://localhost:3010/api/v1';

class SearchAddressPage extends Component {

  state = {
    origin: { address: '', location: { lat: null, lng: null } },
    destination: { address: '', location: { lat: null, lng: null } },
    directions: null,
    spots: [],
    waypoints: [],
    showDirectionsForm: false,
    rating: null
  }

  // handleOriginChange = () => {
  //   let newOrigin = this.state.origin
  //   newOrigin.address = this.originElement.value
  //   this.setState({ origin: newOrigin })
  // }
  //
  // handleDestinationChange = () => {
  //   let newDestination = this.state.destination
  //   newDestination.address = this.destinationElement.value
  //   this.setState({ destination: newDestination })
  // }
  //
  // resetWaypoints = () => {
  //   this.setState({ waypoints: [] })
  // }

  handleAddressSubmit = () => {
    // this.handleOriginChange()
    // this.handleDestinationChange()
    // this.resetWaypoints()

    let newOrigin = this.state.origin
    newOrigin.address = this.originElement.value

    let newDestination = this.state.destination
    newDestination.address = this.destinationElement.value

    this.setState({
      origin: newOrigin,
      destination: newDestination,
      waypoints: []
    }, () => this.getCoords(this.state))

  }

  getCoords = (state) => {

    const removeOriginPunctuation = state.origin.address.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")
    const formattedOriginAddress = removeOriginPunctuation.replace(/\s{2,}/g," ")

    const removeDestinationPunctuation = state.destination.address.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")
    const formattedDestinationAddress = removeDestinationPunctuation.replace(/\s{2,}/g," ")

    const geo = geocoder({ key:'YOUR_API_KEY'})

    geo.find(formattedOriginAddress, (err, resp) => {
      if (err) {
        console.log(err)
      }
      else {
        let newOriginState = state.origin
        newOriginState.location = resp[0].location
        this.setState({ origin: newOriginState })
      }
    })

    geo.find(formattedDestinationAddress, (err, resp) => {
      if (err) {
        console.log(err)
      }
      else {
        let newDestinationState = state.destination
        newDestinationState.location = resp[0].location
        this.setState({ destination: newDestinationState }, () => this.getDirections())
      }
    })

  }

  getDirections = () => {

    // debugger;

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route( {
      origin: this.state.origin.location,
      destination: this.state.destination.location,
      waypoints: this.state.waypoints === [] ? null : this.state.waypoints.map(waypoint => { return { location: waypoint, stopover: false } }),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      // debugger;
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({ directions: result }, () => console.log('DIRECTIONS:', this.state.directions) )
      }
      else {
        console.error(`error fetching directions ${result}`)
      }
    });
  }

  getNewDirections = () => {

    console.log(this.directionsElement.getDirections())

    let waypoints = this.directionsElement.getDirections().request.waypoints.map(waypoint => {
      return [
        waypoint.location.lat(),
        waypoint.location.lng()
      ]
    })

    this.setState({
      waypoints: waypoints.map(waypoint => { return { lat: waypoint[0], lng: waypoint[1] } }),
    }, () => this.getDirections())

  }

  saveDirections = (event) => {
    // console.log('saving')
    // console.log(this.routeDescriptionElement.value)

    event.preventDefault();
    console.log('trying to save')

    let urlPic = 'http://visitadirondacks.com/sites/default/files/styles/1200x650/public/tupper-lake-adirondacks-scenic-drives.jpg?itok=_L2_7Ba8'

    let origin = [
      this.state.origin.location.lat,
      this.state.origin.location.lng
    ]

    let destination = [
      this.state.destination.location.lat,
      this.state.destination.location.lng
    ]

    let waypoints = this.state.waypoints.map(waypoint => {
      return [
        waypoint.lat,
        waypoint.lng
      ]
    })

    // console.log({ origin, waypoints, destination})

    let newRoute = []
    //
    newRoute.push(origin)
    waypoints.forEach(waypoint => newRoute.push(waypoint))
    newRoute.push(destination)

    let routePolyline = polyline.encode(newRoute)

    let data = {
      name: `${this.state.origin.address} to ${this.state.destination.address}`,
      polyline: routePolyline,
      image_url: urlPic,
      description: this.routeDescriptionElement.value,
      rating: this.state.rating
    }

    let dataToSend = JSON.stringify({
      route: data,
    })

    console.log(dataToSend)

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')

    fetch(`${API_URL}/routes`, {
      method: 'POST',
      headers: myHeaders,
      body: dataToSend
    })
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
      this.setState({
        rating: null
      },()=> this.props.history.push("/routes"))
    })


  }

  handleRate = (e, { rating }) => {
    this.setState({ rating });
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

  handleMapClicks = (event, map) => {
      // debugger
      // let mapz = this._mapComponent
      // console.log('something changed', mapz.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)
      // console.log('clicked the map', mapz)
      // console.log('the latitude and longitude is', event.latLng.lat(), event.latLng.lng())

      // if (this.state.displaySpotForm) {
      //   ReactDOM.findDOMNode(this.refs.spotLatitude).value = event.latLng.lat();
      //   ReactDOM.findDOMNode(this.refs.spotLongitude).value = event.latLng.lng();
      // }

      console.log('hello')
      console.log(event.latLng.lat())
      console.log(event.latLng.lng())

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

    reloadThePage = () => (
      this.props.history.push("/map")
    )


  componentDidMount = () => {
    this.getSpots()
    console.log(this.state)
  }

  render(){
    return(
      <div>

      <div className="navbar">
        <NavBar />
      </div>

      <div className="address-form-selections">
        <AddressForm
          handleAddressSubmit = { this.handleAddressSubmit }
          originRef = { el => this.originElement = el }
          destinationRef = { el => this.destinationElement = el }
        />
        { this.state.directions &&
          <SaveRouteModal
            saveDirections = { this.saveDirections }
            handleRate = { this.handleRate }
            routeDescriptionRef = { el => this.routeDescriptionElement = el }
          />
        }
        <AddSpotModal
          reloadThePage = {this.reloadThePage}
        />
      </div>

        <div className="color-background">
        </div>

        <div className="white-background">
        </div>

        <div className="map-container">
          <MapContainer
            destination = { this.state.destination }
            origin = { this.state.origin }
            directions = { this.state.directions }
            spots = { this.state.spots }
            waypoints = { this.state.waypoints }
            getNewDirections = { this.getNewDirections }
            directionsRef = { el => this.directionsElement = el }
            handleMapClicks = { this.handleMapClicks }
            onSpotClick = { this.onSpotClick }
            addSpotToRoute = { this.addSpotToRoute }
          />
        </div>

      </div>
    )
  }

}

export default SearchAddressPage;
