/* jshint node: true */

var request = require("supertest");

/*
 * expose
 */

module.exports = superflat;

/*
 * superflat
 */

function superflat(url) {
  return function(path, opts, callback) {
    if ("function" === typeof opts) {
      callback = opts;
      opts = {};
    }

    opts = opts || {};

    if (!opts.method) {
      opts.method = "get";
    }

    var r = request(url);
    r = r[opts.method.toLowerCase()](path);

    if (opts.data) {
      r = r.send(opts.data);
    }

    if (opts.query) {
      r = r.query(opts.query);
    }

    if (opts.set) {
      var keys = Object.keys(opts.set);
      keys.forEach(function(k) {
        r = r.set(k, opts.set[k]);
      });
    }

    r.end(callback);
  };
}
