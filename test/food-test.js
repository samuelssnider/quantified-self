var chai = require('chai');
var assert = chai.assert;

var Food = require('../lib/food');

var assert = chai.assert
describe('Food', function() {
  context('can create a new food', function() {
    it('should create some food', function(){
      var iceCream = new Food("Ice Cream Cone", 135);
      assert.typeOf(iceCream, 'object');
      assert.equal(iceCream.name, "Ice Cream Cone")
      assert.equal(iceCream.calories, "135")
    });
  });  
});