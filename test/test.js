/**
 * Created by usuario1 on 4/15/2017.
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config/config');

var formUrl = require('../scripts/formUrl');

describe('Routing', function() {
    var url = 'http://localhost:3000';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        mongoose.connect(config.db.mongodb);
        done();
    });

    beforeEach(function (done) {
       done();
    });

    describe('Item by Id', function() {
        it('should return a item', function(done) {
            var id = 3030;
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .get('/api/item/' + id)
                .expect(200)
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('_id');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('plaintext');
                    // this is should.js syntax, very clear
                    done();
                });
        });
        it('should return not found',function (done) {
            var id = 10;

            request(url)
                .get('/api/item/' + id)
                .expect(404)
                .end(function (err,res) {
                    if(err){
                        throw err;
                    }
                    done();
                })
        });
        it('should return error in item with string', function (done) {
            var id = 'string';

            request(url)
                .get('/api/item/' + id)
                .expect(400)
                .end(function (err,res) {

                    if(err){
                        throw err;
                    }

                    done();
                })
        })
    });

    describe('Match-list by name',function () {
        it('should return a match-list',function (done) {
            var name = 'nevermore1234';

            request(url)
                .get('/api/match-list/' + name + '/name')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.summonerId.should.equal(5162029);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('matches');
                    done();
                });
        });
        it('should return a match-list not found',function (done) {
            var name = 'rererere';

            request(url)
                .get('/api/match-list/' + name + '/name')
                .expect(404)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
        it('should return a match-list bad request',function (done) {
            var name = '32,ds';

            request(url)
                .get('/api/match-list/' + name + '/name')
                .expect(400)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    mongoose.connection.close();
                    // this is should.js syntax, very clear
                    done();
                });
        });
    });
    describe('Script url', function() {
        it('should return url valid', function(done) {
            var id = 10;
            var url = formUrl('http://localhost:3000/api/item/{{id}}','id',id);
            url.should.equal('http://localhost:3000/api/item/10');
            done();
        });
        it('should return same url', function(done) {
            var id = 10;
            var url = formUrl('http://localhost:3000/api/item/{{id}}','name',id);
            url.should.equal('http://localhost:3000/api/item/{{id}}');
            done();
        });
    });
});