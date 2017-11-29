var chai = require('chai');
var assert = chai.assert;

var Food = require('../lib/models/food');

var assert = chai.assert
describe('Food', function() {
  context('can create a new food', function() {
    it('should create some food', function(){
      var iceCream = new Food("Ice Cream Cone", 135);
      assert.typeOf(iceCream, 'object');
      assert.equal(iceCream.name, "Ice Cream Cone")
      assert.equal(iceCream.calories, 135)
    });
  });
  context('can edit a food', function() {
    it('should edit some food', function(){
      var iceCream = new Food("Ice Cream Cone", 135);
      iceCream.edit("Strawberry", 43)
      assert.equal(iceCream.name, "Strawberry")
      assert.equal(iceCream.calories, 43)
    });
  });  
});