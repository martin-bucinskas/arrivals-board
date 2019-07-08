import React, { Component } from 'react';

class Arrival extends Component {

  constructor(props) {
    super(props);

    this.state = {
      towards: props.towards,
      expectedArrival: new Date(props.expectedArrival),
      platformName: props.platformName
    };
  }

  render() {
    return (<>
      <div className="row" id="arrival">
        <div className="col" id="arrival-towards">
          { this.state.towards.toUpperCase() }
        </div>
        <div className="col" id="arrival-time">
          {
            this.state.expectedArrival
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