import React, { Component } from 'react';
import './Arrival.css';

class Arrival extends Component {

  constructor(props) {
    super(props);

    this.state = {
      towards: props.towards,
      expectedArrival: new Date(props.expectedArrival),
      platformName: props.platformName,
      lineId: props.lineId,
      currentLocation: props.currentLocation,
      vehicleId: props.vehicleId,
      showMoreInformation: false
    };
  }

  static calculateCountdownInMinutes(date) {
    return Math.round((date - new Date()) / (1000 * 60));
  }

  renderMoreInformation() {
    return (<>
      <div className="row" id="arrival-more-information">
        <div className="col" id="arrival-current-location">
          Location: { this.state.currentLocation }
        </div>
        <div className="col" id="arrival-vehicle-id">
          Vehicle ID: { this.state.vehicleId }
        </div>
      </div>
    </>);
  }

  render() {
    return (<>
      <div className="row" id="arrival">
        <div className="col-1" id="arrival-line-colour-box">
          <div className="arrival-line-colour" id={ 'arrival-line-' + this.state.lineId }/>
        </div>
        <div className="col-8" id="arrival-towards">
          { this.state.towards.toUpperCase() }
        </div>
        <div className="col-2" id="arrival-time">
          {
            Arrival.calculateCountdownInMinutes(this.state.expectedArrival)  > 0 ?
              Arrival.calculateCountdownInMinutes(this.state.expectedArrival) +  ' mins' :
              'due'
          }
        </div>
      </div>
      {
        this.state.showMoreInformation &&
        this.renderMoreInformation()
      }
      <hr/>
    </>);
  }
}

Arrival.defaultProps = {
  towards: 'Check front of train',
  expectedArrival: new Date(),
  platformName: '',
  line: 'unknown',
  currentLocation: 'unknown',
  vehicleId: 0
};

export default Arrival;