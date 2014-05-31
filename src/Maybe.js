var isNil = require('./util').isNil;

function Maybe(x) {
  if (!(this instanceof Maybe)) {
    return new Maybe(x);
  }
  this.value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
};

// functor
Maybe.prototype.map = function(f) {
  return isNil(this.value) ? this : new Maybe(f(this.value));
};

// apply
// takes a Maybe that wraps a function (`app`) and applies its `map`
// method to this Maybe's value, which must be a function.
Maybe.prototype.ap = function(m) {
  if (typeof this.value !== 'function') {
    throw new TypeError("Calling ap on a Maybe requires that the Maybe is wrapping a function");
  }
  return m.map(this.value);
};

// applicative
Maybe.prototype.of = Maybe.of;

// chain
//  f must be a function which returns a value
//  f must return a value of the same Chain
//  chain must return a value of the same Chain
//
Maybe.prototype.chain = function(f) {
   return this.value ? f(this.value) : this;
};

// monad
// A value that implements the Monad specification must also implement the Applicative and Chain specifications.
// see above.

module.exports = Maybe;


