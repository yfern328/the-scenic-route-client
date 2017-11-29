import React from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import SaveRouteForm from '../components/SaveRouteForm'


const SaveRouteModal = (props) => (
  <Modal trigger={<Button>Save This Route</Button>} >
    <Modal.Header>Rate & Save This Route</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='http://visitadirondacks.com/sites/default/files/styles/1200x650/public/tupper-lake-adirondacks-scenic-drives.jpg?itok=_L2_7Ba8' />
      <div className="save-route-form">
        <Modal.Description>
          <SaveRouteForm
            saveDirections = { props.saveDirections }
            handleRate = { props.handleRate }
            routeDescriptionRef = { props.routeDescriptionRef }
          />
        </Modal.Description>
      </div>
    </Modal.Content>
  </Modal>
)

export default SaveRouteModal;
