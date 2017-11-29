import React from 'react'
import { Card, Image, Rating } from 'semantic-ui-react'
import ViewRouteModal from './ViewRouteModal'

const RouteCard = (props) => (
  <Card>
    <Image src = {props.routePic} />
    <Card.Content>
      <Card.Header>
        <div className="route-card-name">
          {props.routeName}
        </div>
      </Card.Header>
      <Card.Description>
        <div className="route-card-rating">
          <Rating defaultRating={props.routeRating} maxRating={5} icon='star' size='massive' disabled />
        </div>
      </Card.Description>
      <Card.Content extra>
        <div className="route-card-button">
          <ViewRouteModal
            routeName = { props.routeName }
            routeDescription = { props.routeDescription }
            routeOrigin = { props.routeOrigin }
            routeDestination = { props.routeDestination }
            routeWaypoints = { props.routeWaypoints }
          />
        </div>
      </Card.Content>
    </Card.Content>
  </Card>
)

export default RouteCard;
