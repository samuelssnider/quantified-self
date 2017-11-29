function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

Food.prototype.edit = function (name, calories) {
  this.name = name;
  this.calories = calories;
};

module.exports = Food;