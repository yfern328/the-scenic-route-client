import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import VideoBackground from '../components/VideoBackground'
import LogInForm from '../components/LogInForm'


class HomePage extends Component {


  handleLogIn = () => {
    this.props.history.push("/map")
  }

  render(){

    return(
      <div>

      <div className='video-background'>
        <VideoBackground />
      </div>

      <div className="login-form-backdrop">
      </div>

      <div className="login-form">
        <h4>Sign In</h4> 
        <LogInForm handleLogIn={this.handleLogIn}/>
      </div>

      <div className="navbar">
        <NavBar userName={this.props.userName}/>
      </div>

      </div>
    )
  }
}

export default HomePage;
