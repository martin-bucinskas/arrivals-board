import React, { Component } from 'react';
import $ from 'jquery';
import tflApiConfig from './tflApi.config';
import Arrival from '../Arrival/Arrival';

// Hack to make jQuery work with webpacked SignalR in React
window.jQuery = $;

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

  sortMap(arrivals) {
    return Object.keys(arrivals)
      .sort()
      .reduce((acc, key) => ({
        ...acc, [key]: arrivals[key]
      }), {});
  }

  render() {
    const arrivals = Array.from(new Map([...this.state.hammersmith].concat([...this.state.circle].concat([...this.state.metropolitan]))));

    let eastbound = [];
    let westbound = [];

    if(arrivals.length > 1) {
      eastbound = arrivals.filter(entry => { return entry[0] !== undefined ? entry[1]['direction'].includes('Eastbound') : null })
        .reduce((map, entry) => (map[entry[0]] = entry[1]['arrival'], map), {});
      westbound = arrivals.filter(entry => { return entry[0] !== undefined ? entry[1]['direction'].includes('Westbound') : null })
        .reduce((map, entry) => (map[entry[0]] = entry[1]['arrival'], map), {});
      eastbound = this.sortMap(eastbound);
      westbound = this.sortMap(westbound);
    }

    return (<>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2><b>Platform 1 (Westbound)</b></h2>
            <hr/>
            <div id="departures-westbound">
              { arrivals.length < 1? 'Loading...' : Object.values(westbound) }
            </div>
          </div>
          <div className="col">
            <h2><b>Platform 2 (Eastbound)</b></h2>
            <hr/>
            <div id="departures-eastbound">
              { arrivals.length < 1 ? 'Loading...' : Object.values(eastbound) }
            </div>
          </div>
        </div>
      </div>
    </>);
  }
}

export default Board;