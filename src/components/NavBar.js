import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment, Image } from 'semantic-ui-react'
import Icon from './Icon'

class NavBar extends Component {

  state = { activeItem: null }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })

    // switch(name) {
    // case 'home':
    //   return <Link to="/">Home</Link>{' '};
    // default:
    //   return state;
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Link to="/"> <Menu.Item name='Home' active={activeItem === 'home'} onClick={this.handleItemClick} /> </Link>
          <Link to="/map"> <Menu.Item name='Map' active={activeItem === 'messages'} onClick={this.handleItemClick} /> </Link>
          <Link to="/routes"> <Menu.Item name='Routes' active={activeItem === 'friends'} onClick={this.handleItemClick} /> </Link>
          <div className="header-logo">
            <Image height='75vh' src='https://i.imgur.com/NQPwsSt.png' />
          </div>
          <Icon userName={this.props.userName}/>
        </Menu>
      </Segment>
    )
  }
}

export default NavBar;
