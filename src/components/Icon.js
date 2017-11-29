import React from 'react'
import { Header, Image } from 'semantic-ui-react'

const Icon = () => (
  <div className="navbar-icon">
    <Header as='h3'>
      <Image shape='circular' src='https://react.semantic-ui.com/assets/images/avatar/large/patrick.png' />
      { true || 'Patrick'  } {''}
    </Header>
  </div>
)

export default Icon;
