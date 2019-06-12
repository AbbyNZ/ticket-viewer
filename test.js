var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("http://localhost:3000");

// Test Case 1: Access home page
describe("Loading of home page", function() {
  it("should return home page", function(done) {
    server.get("/")
          .expect("Content-type", /json/)
          .expect(200) //this is http response
          .end(function(err, res) {
            res.status.should.equal(200);
            (res.text.includes("Ticket ID:")).should.be.equal(true);
            (res.text.includes('btnPrevious')).should.be.equal(true);
            (res.text.includes('btnNext')).should.be.equal(true);
            done();
          });
  });
});

//Test Case 2: Test Previous and Next button
describe("A user clicks the next button on the current page", function() {
  it("should return the next page and list of tickets", function(done) {
    server.get("/2")
          .expect("Content-type", /json/)
          .expect(200)
          .end(function(err, res) {
            (res.text.includes('Ticket ID:')).should.be.equal(true);
            (res.text.includes('btnPrevious')).should.be.equal(true);
            (res.text.includes('btnNext')).should.be.equal(true);
            done();
          });
  });
});

//Test Case 3: Test View Button
describe("A user clicks the view details button to view a single ticket with a ticket id of 7", function() {
  it("should return information about the ticket that has been choosen", function(done) {
    server.get("/ticket/7")
          .expect("Content-type", /html/)
          .expect(200)
          .end(function(err, res) {
            (res.text.includes('Ticket ID:')).should.be.equal(true);
            (res.text.includes('Status:')).should.be.equal(true);
            (res.text.includes('Requester ID:')).should.be.equal(true);
            (res.text.includes('Assignee ID:')).should.be.equal(true);
            (res.text.includes('Subject')).should.be.equal(true);
            (res.text.includes('Description')).should.be.equal(true);
            (res.text.includes('Tags')).should.be.equal(true);
            (res.text.includes('Created At:')).should.be.equal(true);
            done();
          });
  });
});

//Test Case 4: 404 Error
describe("Loading a page which does not exist. The app should respond 404 Page not Found", function() {
  it("should return 404", function(done) {
    server.get("/9000")
          .expect(404)
          .end(function(err, res) {
            res.status.should.equal(404);
            done();
          });
  });
});
