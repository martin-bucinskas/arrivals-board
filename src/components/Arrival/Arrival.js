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
    };
  }

  static calculateCountdownInMinutes(date) {
    return Math.round((date - new Date()) / (1000 * 60));
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
      <hr/>
    </>);
  }
}

Arrival.defaultProps = {
  towards: 'Check front of train',
  expectedArrival: new Date(),
  platformName: '',
  line: 'unknown'
};

export default Arrival;