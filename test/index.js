/* jshint node: true */

var express = require("express");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

app.get("/get", function(req, res, next) {
  res.send("Hello World!");
});

app.post("/post", function(req, res, next) {
  res.send(req.body);
});

app.get("/headers", function(req, res, next) {
  res.send(req.headers["x-api-key"]);
});

var assert = require("chai").assert;
var superflat = require("..");

describe("superflat", function() {
  var server;
  before(function(done) {
    server = app.listen(7331, done);
  });

  after(function(done) {
    server.close(done);
  });

  var req = superflat("http://localhost:7331");

  it("makes GET", function(done) {
    req("/get", function(err, res) {
      assert.equal(res.text, "Hello World!");
      done();
    });
  });

  it("makes POST", function(done) {
    var opts = {method: "POST", data: {foo: "bar"}};
    req("/post", opts, function(err, res) {
      assert.deepEqual(res.body, {foo: "bar"});
      done();
    });
  });

  it("support set", function(done) {
    var opts = {set: {"X-API-Key": "foobar"}};
    req("/headers", opts, function(err, res) {
      assert.deepEqual(res.text, "foobar");
      done();
    });
  });
});
