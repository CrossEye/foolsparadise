var isNil = require('./util').isNil;

function Either(left, right) {
  if (!(this instanceof Either)) {
    return new Either(left, right);
  }
  this.left = left;
  this.right = right;
}

Either.of = function(value, err) {
  return new Either(err, value);
};

Either.prototype.map = function(f) {
  return (isNil(this.right)) ? this : new Either(this.left, f(this.right));
};

Either.prototype.ap = function(app) {
  return new Either(app.left, app.map(this.value));
};

// `f` must return a new Either; not sure if this impl is sufficient
Either.prototype.chain = function(f) {
  return f(this.right);
};


Either.prototype.of = Either.of;

module.exports = Either;



