import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board";
import sinon from 'sinon';
import stationConfig from './tflApi.config.json';
import $ from 'jquery';

const expect = require('chai').expect;

describe('Board component', () => {

  const testArrivalData = [
    [
      { LineId: 'hammersmith-city', PlatformName: 'Eastbound (Platform 2)', Towards: 'Barking', ExpectedArrival: '2019-07-08T16:20:00', Id: 'h1'},
      { LineId: 'hammersmith-city', PlatformName: 'Eastbound (Platform 2)', Towards: 'Aldgate', ExpectedArrival: '2019-07-08T16:22:00', Id: 'h2'},
      { LineId: 'hammersmith-city', PlatformName: 'Westbound (Platform 1)', Towards: 'Hammersmith', ExpectedArrival: '2019-07-08T16:24:00', Id: 'h3'},
      { LineId: 'hammersmith-city', PlatformName: 'Westbound (Platform 1)', Towards: 'Uxbridge', ExpectedArrival: '2019-07-08T16:26:00', Id: 'h4'}
    ],
    [
      { LineId: 'circle', PlatformName: 'Eastbound (Platform 2)', Towards: 'Barking', ExpectedArrival: '2019-07-08T17:21:00', Id: 'c1'},
      { LineId: 'circle', PlatformName: 'Eastbound (Platform 2)', Towards: 'Aldgate', ExpectedArrival: '2019-07-08T17:22:00', Id: 'c2'},
      { LineId: 'circle', PlatformName: 'Westbound (Platform 1)', Towards: 'Hammersmith', ExpectedArrival: '2019-07-08T17:23:00', Id: 'c3'},
      { LineId: 'circle', PlatformName: 'Westbound (Platform 1)', Towards: 'Uxbridge', ExpectedArrival: '2019-07-08T17:24:00', Id: 'c4'}
    ],
    [
      { LineId: 'metropolitan', PlatformName: 'Eastbound (Platform 2)', Towards: 'Barking', ExpectedArrival: '2019-07-08T16:34:00', Id: 'm1'},
      { LineId: 'metropolitan', PlatformName: 'Eastbound (Platform 2)', Towards: 'Aldgate', ExpectedArrival: '2019-07-08T16:35:00', Id: 'm2'},
      { LineId: 'metropolitan', PlatformName: 'Westbound (Platform 1)', Towards: 'Hammersmith', ExpectedArrival: '2019-07-08T16:36:00', Id: 'm3'},
      { LineId: 'metropolitan', PlatformName: 'Westbound (Platform 1)', Towards: 'Uxbridge', ExpectedArrival: '2019-07-08T16:37:00', Id: 'm4'}
    ]
  ];

  describe('Rendering', () => {
    const testProps = {
      towards: 'Morden',
      expectedArrival: new Date(),
      platformName: 'Eastbound (Platform 1)'
    };

    it('renders without crashing when no props are passed', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Board />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('Unit Tests', () => {
    it('generates arrival component map when given an array of arrival data', () => {
      let board = new Board();

      testArrivalData.forEach(testData => {
        let generatedMap = board.generateArrivals(testData);

        expect(generatedMap.size).to.be.equal(4);

        let index = 0;

        generatedMap.forEach(entry => {
          expect(entry).to.have.keys('direction', 'arrival');
          expect(entry.direction).to.be.equal(testData[index].PlatformName);
          expect(entry.arrival).to.be.an('object');
          index++;
        });
      });
    });

    it('attempts to subscribe to API and add line rooms when component mounts', () => {
      let board = new Board();
      let expectedHub = [{"name":"predictionsroomhub"}];

      expect($.connection.hub.url).to.be.equal(stationConfig.tflAPI);

      let spy = sinon.spy($.connection.hub, 'start');

      board.componentDidMount();

      expect(spy.calledOnce, 'Component should mount only once per page request').to.be.equal(true);

      expect(JSON.parse(spy.getCall(0).thisValue._.initHandler.connection.data)).to.be.deep.equal(expectedHub);

      spy.restore();
    });

    it('creates an array of tube lines containing line id and naptan id', () => {
      let board = new Board();

      let expectedArray = [
        { 'LineId': 'circle', 'NaptanId': '940GZZLUGPS' },
        { 'LineId': 'metropolitan', 'NaptanId': '940GZZLUGPS' },
        { 'LineId': 'hammersmith-city', 'NaptanId': '940GZZLUGPS' }
      ];

      let actualArray = board.getLineRooms();

      expect(actualArray).to.be.deep.equal(expectedArray);
    });

    it('updates state variables depending which LineId was given', () => {
      let board = new Board();
      let generateArrivalsStub = sinon.stub(board, 'setState');

      testArrivalData.forEach(testData => {
        board.update(testData);
      });

      expect(generateArrivalsStub.getCall(0).args[0]).to.have.keys('hammersmith');
      expect(generateArrivalsStub.getCall(1).args[0]).to.have.keys('circle');
      expect(generateArrivalsStub.getCall(2).args[0]).to.have.keys('metropolitan');

      generateArrivalsStub.restore();
    });

    it('sorts an unsorted map by key in an ascending order', () => {
      let board = new Board();

      let unsorted = new Map();
      unsorted.set(new Date('Mon Jul 08 2019 17:20:00'), {});
      unsorted.set(new Date('Mon Jul 08 2019 13:24:00'), {});
      unsorted.set(new Date('Mon Jul 08 2019 16:22:00'), {});
      unsorted.set(new Date('Mon Jul 08 2019 19:26:00'), {});

      const sortedArrivalKeys = [
        new Date('Mon Jul 08 2019 13:24:00'),
        new Date('Mon Jul 08 2019 16:22:00'),
        new Date('Mon Jul 08 2019 17:20:00'),
        new Date('Mon Jul 08 2019 19:26:00')
      ];

      let arrivals = Array.from(unsorted);

      arrivals = arrivals.reduce((map, entry) => (map[entry[0]] = entry[1]['arrival'], map), {});

      let sortedArrivals = board.sortMap(arrivals);

      let index = 0;

      Object.keys(sortedArrivals).forEach(key => {
        expect(key).to.be.equal(sortedArrivalKeys[index].toString());
        index++;
      });
    });
  });

  describe('Integration testing', () => {

    it('generate arrivals and sort them into their state variable', () => {
      const div = document.createElement('div');
      let board = ReactDOM.render(<Board/>, div);
      let spy = sinon.spy(board, 'generateArrivals');

      testArrivalData.forEach(testData => {
        board.update(testData);
      });

      expect(spy.getCall(0).thisValue.state.hammersmith.size).to.be.equal(4);
      expect(spy.getCall(0).thisValue.state.circle.size).to.be.equal(4);
      expect(spy.getCall(0).thisValue.state.metropolitan.size).to.be.equal(4);

      spy.restore();
    });
  });
});