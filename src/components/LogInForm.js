import React from 'react'
import { Checkbox, Form } from 'semantic-ui-react'

const LogInForm = (props) => (
  <Form onSubmit={ props.handleLogIn }>
  <Form.Field required width={10}>
    <label>First Name</label>
    <input placeholder='First Name' />
  </Form.Field>
    <Form.Field required width={10}>
      <label>E-Mail</label>
      <input placeholder='E-Mail' />
    </Form.Field>
    <Form.Field required width={10}>
      <label>Password</label>
      <input type="password" placeholder='Password' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Form.Button color="black" content='Submit' />
  </Form>
)

export default LogInForm
