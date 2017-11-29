import React from 'react';
import { Form } from 'semantic-ui-react';

const AddressForm = (props) => (

    <div className="address-form">
      <Form onSubmit={props.handleAddressSubmit}>
        <Form.Field required width={10} >
          <label>Origin Address: </label>
          <input required placeholder='Start Address' name='originAddress' ref={props.originRef} />
        </Form.Field>
        <Form.Field required width={10}>
          <label>Destination Address: </label>
          <input required placeholder='End Address' name='destinationAddress' ref={props.destinationRef} />
        </Form.Field>
        <Form.Button content='Search' color='green' />
      </Form>
    </div>

)

export default AddressForm;
