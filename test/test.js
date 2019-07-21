var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);

describe('jokes', function() {
    it('should return status 200 on /dadjokes POST', function(done) {
        chai.request(app)
            .post('/dadjokes')
            .send({'page': 1, 'term': ''})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
    it('should return json on /dadjokes POST', function(done) {
        chai.request(app)
            .post('/dadjokes')
            .send({'page': 1, 'term': ''})
            .end(function(err, res){
                res.should.be.json;
                done();
            });
    });
    it('should.have.property "results" on /dadjokes POST', function(done) {
        chai.request(app)
            .post('/dadjokes')
            .send({'page': 1, 'term': ''})
            .end(function(err, res){
                res.body.should.have.property("results");
                done();
            });
    });
});

