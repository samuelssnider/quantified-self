//wrap this whole thing in a class (for ref: http://backend.turing.io/module4/lessons/intro-to-oojs)
//create a new file and class that contains EventHandler, then call those things in here
import { appendFoodToMeal, appendFoodIndex, getTotalCalories, getRemainingCalories,
         colorizeCals, appendGrandTotal, mealId } from '../models/meal_helpers.js'
const API = "http://localhost:3000"

var deleteFood = function(e) {
  e.preventDefault();
  var list = this.parentElement.firstElementChild.classList
  var deleteFoodId = list[list.length-1]
  var tableName = $(this).parents()[2].id
  var targetElement = this.parentElement
  return $.ajax({
    url: API + '/api/v1/meals/' + mealId(tableName) + '/foods/' + deleteFoodId,
    method: 'DELETE',
  })
  .then(function(data){
     targetElement.remove();
     colorizeCals();
  })
}


$(document).ready(function(){
//shows all foods in tables
  fetch('http://localhost:3000/api/v1/meals')
  .then( function(response) {
      response.json()
      .then(function(data) {
        for(var i = 0; i < data.length; i++){
          appendFoodToMeal(data[i])
        }
      });
    }
  )
  .then( function () {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snack"]
    let grandTotal = 0
      meals.forEach(function (name) {
        let total = getTotalCalories(name);
        getRemainingCalories(total, name);
        grandTotal += total
    })
      appendGrandTotal(grandTotal)
      colorizeCals();
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

// $('#Breakfast-table').on('click','.meals_deletor', deleteFood);
// $('#Lunch-table').on('click','.meals_deletor', deleteFood);
// $('#Dinner-table').on('click','.meals_deletor', deleteFood);
// $('#Snack-table').on('click','.meals_deletor', deleteFood);
})

module.exports = {
  deleteFood,
}

