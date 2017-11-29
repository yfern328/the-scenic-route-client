import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import ModalMap from './ModalMap'

const ViewRouteModal = (props) => (
  <Modal trigger={<Button>View Route</Button>}>
    <Modal.Header>{ props.routeName }</Modal.Header>
    <Modal.Content scrolling >
      <ModalMap
        routeOrigin = { props.routeOrigin }
        routeDestination = { props.routeDestination }
        routeWaypoints = { props.routeWaypoints }
      />
      <Modal.Description >
        <div className="modal-route-description">
          <Header> { props.routeDescription } </Header>
        </div>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ViewRouteModal;
