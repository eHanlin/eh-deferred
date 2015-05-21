
var Deferred = require('../');
var assert = require("assert");

var buildEqualTask = function( done, params ){

  return function(){

    for ( var i in arguments ) {
      assert.equal( params[i], arguments[i] );
    }
    done();
  };
};

var buildErrTask = function( done, err ){
  return function(){
    done(err);
  };
};

describe('Test Deferred', function(){

  var deferred = Deferred(),
      params = [1,2,3,4,5];

  describe('resolve()', function(){
    it('before', function( done ){

      deferred.fail(buildErrTask( done, 'should not be called' ));
      deferred.done(buildEqualTask( done, params ));
    });

    it('always() before', function( done ){

      deferred.always(buildEqualTask( done, params ));
    });
  });


  deferred.resolve.apply( deferred, params );

  describe('resolve()', function(){
    it('after', function( done ){

      deferred.fail(buildErrTask( done, 'should not be called' ));
      deferred.done(buildEqualTask( done, params ));
    });

    it('always() after', function( done ){

      deferred.always(buildEqualTask( done, params ));
    });
  });

});

