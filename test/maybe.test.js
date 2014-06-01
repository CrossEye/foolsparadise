var mocha = require('gulp-mocha');
var assert = require('assert');
var types = require('./types');
var R = require('ramda');

var Maybe = require('../src/Maybe');

describe('Maybe', function() {
  var m = Maybe(1);

  it('is a Functor', function() {
    var fTest = types.functor;
    assert.equal(true, fTest.iface(m));
    assert.equal(true, fTest.id(m));
    assert.equal(true, fTest.compose(m, R.multiply(2), R.add(3)));
  });

  it('is an Apply', function() {
    var aTest = types.apply;
    var app1 = Maybe(function(x) { return x * 10; });
    var app2 = Maybe(10);

    assert.equal(true, aTest.iface(app1));
    assert.equal(true, aTest.compose(app1, app2));
  });

  it('is an Applicative', function() {
    var aTest = types.applicative;
    var app1 = Maybe(101);
    var app2 = Maybe(-123);
    var appF = Maybe(R.multiply(3));
    assert.equal(true, aTest.iface(app1));
    assert.equal(true, aTest.id(app1, app2));
    assert.equal(true, aTest.homomorphic(app1, R.add(3), 46));
    assert.equal(true, aTest.interchange(app2, appF, 17));
  });

  it('is a Chain', function() {
    var cTest = types.chain;
    assert.equal(true, cTest.iface(m));
    assert.equal(true, cTest.associative(m, 
        function(x) {
          return m.of(3 * x);
        },
        function(x) {
          return m.of(5 + x);
        })
    );
    
  });

  it('is a Monad', function() {
    var mTest = types.monad;
    assert.equal(true, mTest.iface(m));
  });

});


