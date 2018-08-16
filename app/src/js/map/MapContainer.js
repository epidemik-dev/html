import React, { Component } from 'react';
import GoogleApiComponent from '../google/GoogleAPIComponent'
import {Map} from './Map'

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      am_sick: false
    }
  }

  render() {
    var button_id;
    var button_text;
    var button_func;
    if(this.state.am_sick) {
      button_id = "healthy_button"
      button_text = "REPORT HEALTHY"
    } else {
      button_id = "sickness_button"
      button_text = "REPORT SICK"
    }
    return (
        <div style={style} id = "map-super-container">
          <div style={style} id="map-container">
            <Map google={this.props.google} />
          </div>
          <button style={button_style} id={button_id} onClick={button_func}>{button_text}</button>
        </div>
      )
  }
}

const style = {
  width: '100vw',
  height: '100vh'
}

const button_style = {
  position: "fixed",
  "zindex": 2,
  width: 100, /* Full width (cover the whole page) */
  height: 100, /* Full height (cover the whole page) */
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

export default GoogleApiComponent({
    apiKey: "AIzaSyAQDNSjsR5fSbsRwOOoPLMLRL1_WsEoUtY"
  })(MapContainer)