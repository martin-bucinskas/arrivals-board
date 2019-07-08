describe ('End to end', () => {
  it('should display loading message and then call apis and display data', () => {
    cy.server().should((server) => {
      expect(server.delay).to.eq(0);
      expect(server.method).to.eq('GET');
      expect(server.status).to.eq(200);
      expect(server.headers).to.be.null;
      expect(server.response).to.be.null;
      expect(server.onRequest).to.be.undefined;
      expect(server.onResponse).to.be.undefined;
      expect(server.onAbort).to.be.undefined;
      expect(server.enable).to.be.true;
      expect(server.force404).to.be.false;
      expect(server.whitelist).to.be.a('function');
    });

    cy.route({
      method: 'GET',
      url: '*'
    }).as('apiHook');

    cy.visit('/');

    cy.contains('Live Arrivals');
    cy.get('#departures-westbound').should('have.text', 'Loading...');
    cy.get('#departures-eastbound').should('have.text', 'Loading...');

    cy.wait('@apiHook').its('status').should('eq', 200);
  });
});