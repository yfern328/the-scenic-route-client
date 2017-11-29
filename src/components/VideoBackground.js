import React, { Component } from 'react';
import VideoCover from 'react-video-cover'

class VideoBackground extends Component {

  state = {
      resizeNotifier: () => {},
    }

  render() {

    const videoOptions = {
      src: 'home-page-video.mp4',
      // src: 'http://techslides.com/demos/sample-videos/small.mp4',
      autoPlay: true,
      loop: true,
      muted: true
    };
    const style = {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      margin: 'auto',
      top: 0,
      left: 0,
      zIndex: -2,
    };

return (
      <div style={style} >
        <VideoCover
          videoOptions={videoOptions}
          remeasureOnWindowResize
          getResizeNotifier={resizeNotifier => {
            this.setState({
              resizeNotifier,
            });
          }}
        />
      </div>
    );
  }
}
export default VideoBackground;
