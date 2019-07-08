import React from 'react';
import ReactDOM from 'react-dom';
import Arrival from './Arrival';

const expect = require('chai').expect;

describe('Arrival component', () => {

  describe('Rendering', () => {
    const testProps = {
      towards: 'Morden',
      expectedArrival: new Date(),
      platformName: 'Eastbound (Platform 1)'
    };

    it('renders without crashing when no props are passed', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Arrival />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing when all props are passed', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Arrival testProps/>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('Function', () => {
    it('calculates countdown in minutes from a given date', () => {
      const tenMinutes = 1000 * 60 * 10;
      const futureDate = new Date(new Date().getTime() + tenMinutes);
      const pastDate = new Date(new Date().getTime() - tenMinutes);

      let actualMinutes = Arrival.calculateCountdownInMinutes(futureDate);

      expect(actualMinutes).to.be.above(0).but.not.above(11);

      actualMinutes = Arrival.calculateCountdownInMinutes(pastDate);

      expect(actualMinutes).to.be.below(0).but.not.below(-11);
    });
  });
});