# superflat

[![Build Status](https://travis-ci.org/nowk/superflat.js.svg?branch=master)](https://travis-ci.org/nowk/superflat.js)
[![Code Climate](https://codeclimate.com/github/nowk/superflat.js.png)](https://codeclimate.com/github/nowk/superflat.js)
[![David DM](https://david-dm.org/nowk/superflat.js.png)](https://david-dm.org/nowk/superflat.js)

Flatten supertest


## Install

    npm install superflat --save-dev

## Example

    var superflat = require("superflat");
    var request = superflat("http://localhost")

    var opts = {method: "POST", data: {foo: "bar"}};
    request("/post", opts, function(err, res) {
      assert.deepEqual(res.body, {foo: "bar"});
      done();
    });

### License

MIT
