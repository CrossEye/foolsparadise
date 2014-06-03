var Constructor = function(f) {  // TODO: does this belong in util?  In Ramda?
  return function Type(val){
    if(!(this instanceof Type)){
      var instance = new Type();
      f.apply(instance, arguments);
      return instance;
    }
    f.apply(this, arguments);
  };
};

var makeTypes = function(ctor, config) {
    var props = config || {};
    var type = Constructor(ctor);
    if (props.concat) {
      type.prototype.concat = config.concat;
    }
    if (props.empty) {
      type.prototype.empty = config.empty;
    }
    if (props.map) {
      type.prototype.map = config.map;
    } else if (props.ap) {
      type.prototype.map = function(f) {return this.of(f).ap(this);};
    }
    if (config.ap) {
      type.prototype.ap = config.ap;
    } else if (config.chain && config.map) {
      type.prototype.ap = function(m) {return m.chain(function(f) { return m.map(f);});};
    }
    if (config.of) {
      type.prototype.of = config.of;
      type.of = config.of;
    }
    if (config.chain) {
      type.prototype.chain = config.chain;
    }
    return type;
};

module.exports = makeTypes;