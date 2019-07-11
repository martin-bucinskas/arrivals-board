import { Server } from 'mock-socket';

describe ('More Information', () => {
  it('should display more information when clicked on arrival', () => {

    const mockAPIUrl = '/signalr/hubs/signalr';
    const mockServer = new Server(mockAPIUrl);

    mockServer.on('connection', socket => {
      socket.on('message', data => {
        // console.log('Intercepted Message: ');
        // console.log(data);
        // socket.send();
      });
    });

    cy.visit('/');

    cy.contains('Live Arrivals');
    cy.get('#departures-westbound').should('have.text', 'Loading...');
    cy.wait(5000);

    mockServer.stop();
  });
});