var isNil = require('./util').isNil;
var makeType = require('./makeType');

var Maybe = makeType(
  function(x) {this.value = x;},
  {
    map: function(f) { // Functor
      return isNil(this.value) ? this : new Maybe(f(this.value));
    },
    ap: function(m) { // Apply
      if (typeof this.value !== 'function') {
        throw new TypeError("Calling ap on a Maybe requires that the Maybe is wrapping a function");
      }
      return m.map(this.value);
    },
    of: function(x) { // Applicative
      return new Maybe(x);
    },
    chain: function(f) { // Chain
       return this.value ? f(this.value) : this;
    }
    // Monad, since both Chain and Applicative
  }
);

module.exports = Maybe;


