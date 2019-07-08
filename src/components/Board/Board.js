import React, { Component } from 'react';
import $ from 'jquery';
import tflApiConfig from './tflApi.config';

require('signalr');
require('./signalr-hub');

class Board extends Component {

  constructor(props) {
    super(props);

    // Store arrivals in state
    this.state = {

    };

    this.update = this.update.bind();
  }

  componentDidMount() {
    $.connection.hub.url = tflApiConfig.tflAPI;

    const hub = $.connection.predictionsRoomHub;

    hub.client.showPredictions = this.update;

    $.connection.hub.start().done(() => {
      hub.server.addLineRooms(this.getLineRooms());
    });
  }

  update(arrivals) {

  }

  getLineRooms() {
    const lineRooms = [];

    tflApiConfig.stations[tflApiConfig.stationToDisplay].lines.forEach(line => {
      lineRooms.push({ 'LineId' : line, 'NaptanId' : tflApiConfig.stations[tflApiConfig.stationToDisplay].naptanId });
    });

    return lineRooms;
  }

  componentWillUnmount() {
    // TODO: Cancel subscriptions and close connection.
  }

  // TODO: Render Arrival array
  render() {
    return (<>

    </>);
  }
}

export default Board;