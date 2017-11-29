import React from 'react';
import { Form, Rating } from 'semantic-ui-react';

const SaveSpotForm = (props) => (

    <div className="save-route-form">
      <Form onSubmit={ (event) => props.handleSaveSpot(event) }>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Spot Name' ref={ props.spotNameRef }/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textArea placeholder='Tell us about this spot...' ref={ props.spotDescriptionRef }/>
        </Form.Field>
        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' onRate={props.handleRate} />
        <Form.Field>
          <label>Image URL</label>
          <input placeholder='Image URL' ref={ props.spotImageURLRef }/>
        </Form.Field>
        <Form.Button content='Save' color='black'/>
      </Form>
    </div>

)

export default SaveSpotForm;
