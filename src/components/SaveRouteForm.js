import React from 'react';
import { Form, Rating } from 'semantic-ui-react';

const SaveRouteForm = (props) => (

    <div className="save-route-form">
      <Form onSubmit={ (event) => props.saveDirections(event) }>
        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' onRate={props.handleRate} />
        <textarea label='Route Description' placeholder='Tell us about this route...' ref={props.routeDescriptionRef}/>
        <Form.Button content='Save' color='black'/>
      </Form>
    </div>

)

export default SaveRouteForm;
