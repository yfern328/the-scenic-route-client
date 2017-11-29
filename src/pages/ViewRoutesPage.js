import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import NavBar from '../components/NavBar'
import RouteCard from '../components/RouteCard'

const polyline = require( 'google-polyline' )
const API_URL = 'http://localhost:3010/api/v1';

class ViewRoutesPage extends Component {

  state = {
    routes: [],
  }

  fetchRoutes = () => {
    return fetch(`${API_URL}/routes`)
           .then(res => res.json())
           .then(routes => routes.map(route => {
             let newRoute = route
             let decodedPolyline = polyline.decode(newRoute.polyline)

             let originArr = decodedPolyline.shift()
             let destinationArr = decodedPolyline.pop()
             let waypointsArr = decodedPolyline.map(point => { return { lat: point[0], lng: point[1] } })

             newRoute['origin'] = { lat: originArr[0], lng: originArr[1] }
             newRoute['destination'] = { lat: destinationArr[0], lng: destinationArr[1] }
             newRoute['waypoints'] = waypointsArr

             return newRoute
           }))
          .then(routes => {
            this.setState({ routes }, () => console.log('FETCHED ROUTES', this.state))
          })
  }

  componentDidMount() {
    this.fetchRoutes()
  }

  render(){
    // console.log("inside render",this.state);
    return(
      <div className="route-page-background">

        <div className="navbar">
          <NavBar />
        </div>

        <div className="route-card-container">
          <Card.Group itemsPerRow={4}>
            { this.state.routes.map(route => <RouteCard
                                                key = { route.id }
                                                routeName = { route.name }
                                                routeDescription = { route.description }
                                                routePic = { route.image_url }
                                                routeRating = { route.rating }
                                                routeOrigin = { route.origin }
                                                routeDestination = { route.destination }
                                                routeWaypoints = { route.waypoints }
                                              />).reverse()
            }
          </Card.Group>
        </div>

      </div>
    )
  }
}

export default ViewRoutesPage;
