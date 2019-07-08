import React, { Component } from 'react';
import './Arrival.css';

class Arrival extends Component {

  constructor(props) {
    super(props);

    this.state = {
      towards: props.towards,
      expectedArrival: new Date(props.expectedArrival),
      platformName: props.platformName
    };
  }

  static calculateCountdownInMinutes(date) {
    return Math.round((date - new Date()) / (1000 * 60));
  }

  render() {
    return (<>
      <div className="row" id="arrival">
        <div className="col" id="arrival-towards">
          { this.state.towards.toUpperCase() }
        </div>
        <div className="col" id="arrival-time">
          {
            Arrival.calculateCountdownInMinutes(this.state.expectedArrival)  > 0 ?
              Arrival.calculateCountdownInMinutes(this.state.expectedArrival) +  ' mins' :
              'due'
          }
        </div>
      </div>
      <hr/>
    </>);
  }
}

Arrival.defaultProps = {
  towards: 'Check front of train',
  expectedArrival: new Date(),
  platformName: ''
};

export default Arrival;