import React, { Component } from 'react';
import GoogleApiComponent from '../google/GoogleAPIComponent'
import {Map} from './Map'

export class MapContainer extends Component {
    render() {
        const style = {
            width: '100vw',
            height: '100vh',
            position: "relative"
          }
        return (
            <div style={style} id = "map-container">
              <Map google={this.props.google} />
            </div>
          )
      }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyAQDNSjsR5fSbsRwOOoPLMLRL1_WsEoUtY"
  })(MapContainer)