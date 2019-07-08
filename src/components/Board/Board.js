import React, { Component } from 'react';
import $ from 'jquery';
import tflApiConfig from './tflApi.config';
import Arrival from '../Arrival/Arrival';

require('signalr');
require('./signalr-hub');

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hammersmith: [],
      circle: [],
      metropolitan: []
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
    switch(arrivals[0].LineId) {
      case "hammersmith-city":
        this.setState({ hammersmith: this.generateArrivals(arrivals) });
        break;
      case "circle":
        this.setState({ circle: this.generateArrivals(arrivals) });
        break;
      case "metropolitan":
        this.setState({ metropolitan: this.generateArrivals(arrivals) });
        break;
      default:
        break;
    }
  }

  generateArrivals(arrivals) {
    let arrivalsMap = new Map();

    arrivals.forEach(arrival => {
      let arrivalEntry = {
        direction: arrival.PlatformName,
        arrival: <Arrival towards={ arrival.Towards } expectedArrival={ arrival.ExpectedArrival } platformName={ arrival.PlatformName } key={ 'arrival-' + arrival.Id }/>
      };

      arrivalsMap.set(new Date(arrival.ExpectedArrival), arrivalEntry);
    });

    return arrivalsMap;
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