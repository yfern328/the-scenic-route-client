import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'
import SpotModalMap from './SpotModalMap'
import SaveSpotForm from './SaveSpotForm'

const polyline = require( 'google-polyline' )
const API_URL = 'http://localhost:3010/api/v1';

class AddSpotModal extends Component {

  // if (this.state.displaySpotForm) {
  //     ReactDOM.findDOMNode(this.refs.spotLatitude).value = event.latLng.lat();
  //     ReactDOM.findDOMNode(this.refs.spotLongitude).value = event.latLng.lng();
  //   }

  state = {
    currentSpot: { lat: null, lng: null },
    rating: 3
  }

  handleMapClicks = (event, map) => {

    console.log('does it work?')

    this.setState({
      currentSpot: { lat: event.latLng.lat(), lng: event.latLng.lng() }
    }, () => console.log('ADD SPOT STATE', this.state))

  }

  handleRate = (e, { rating }) => {
    this.setState({ rating });
  }


  handleSaveSpot = (event) => {
    event.preventDefault();
    console.log('clicked the save button')

    let spotArr = []

    let spotLocation = [this.state.currentSpot.lat, this.state.currentSpot.lng]

    spotArr.push(spotLocation)

    let spotPolyline = polyline.encode(spotArr)


    let data = {
      name: this.spotNameElement.value,
      polyline: spotPolyline,
      image_url: this.spotImageURLElement.value,
      description: this.spotDescriptionElement.value,
      rating: this.state.rating
    }

    let dataToSend = JSON.stringify({
      spot: data,
    })

    console.log(dataToSend)


    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')

    fetch(`${API_URL}/spots`, {
      method: 'POST',
      headers: myHeaders,
      body: dataToSend
    })
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
      this.props.reloadThePage()
    })

  }

  render() {
    return(
      <Modal trigger={<Button>Add A Spot</Button>}>
        <Modal.Header>Right Click The Map To Load A Spot</Modal.Header>
        <Modal.Content scrolling >
          <SpotModalMap
            handleMapClicks = {this.handleMapClicks}
          />
          <Modal.Description >
            <div className="modal-route-description">
              <SaveSpotForm
                handleRate={this.handleRate}
                handleSaveSpot = {this.handleSaveSpot}
                spotNameRef = { el => this.spotNameElement = el }
                spotDescriptionRef = { el => this.spotDescriptionElement = el }
                spotImageURLRef = { el => this.spotImageURLElement = el }
              />
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }

}

export default AddSpotModal;
