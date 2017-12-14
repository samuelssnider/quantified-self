var API = "http://localhost:3000"
var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'

import { createTableHead, createFoodRow, createEditImage, setTDGrandparent,
         editFoodInit, editTheFood, searchAndLimit } from '../models/food_helpers'
import { getTotalCalories, getRemainingCalories, rebuildOriginalTable, sortByCalories } from '../models/meal_helpers'

var readFoodCreate = function(foodId, foot){
  return $.ajax({
    url: API + '/api/v1/foods/' + foodId,
    method: 'GET',
  })
  .then(function(data) {
    const tableRow = createFoodRow(data)
    foot.before(tableRow)
  })
}

var readFoodReplace = function(editPane, table){
  return $.ajax({
    url: API + '/api/v1/foods/' + editPane.classList[1],
    method: 'GET',
  })
  .then(function(data) {
    const tableRow = createFoodRow(data)
    table.replaceChild(tableRow, editPane.parentElement)
  })
}

var deleteFood = function(e) {
  e.preventDefault();
  var deleteId = parseInt(this.parentNode.firstChild.classList[1]);
  $.ajax({
    url: API + '/api/v1/meals/', 
    method: 'GET',
  })
  .then(function(data){
    for(var i = 0;i < data.length; i ++){
      for(var j = 0; j < data[i]['foods'].length; j ++){
        if(data[i]['foods'][j]['id'] === deleteId){
          deleteMealFood(data[i]['id'], data[i]['foods'][j]['id'])
        }
      }
    }
  })
  return $.ajax({
    url: API + '/api/v1/foods/' + deleteId.toString(),
    method: 'DELETE',
  })
  .then(function(data){
    $(`table tr .${deleteId}`)[0].parentNode.remove()
  })
}

var deleteMealFood = function(mealId, foodId) {
  return $.ajax({
    url: API + '/api/v1/meals/' + mealId + '/foods/' + foodId,
    method: 'DELETE',
  })
}

var createFood = function(e) {
  e.preventDefault();
  var newFoodName = $("#food_creator input[name='food-name']").val();
  var newFoodCals = $("#food_creator input[name='food-calories']").val();
  return $.ajax({
    url: API + '/api/v1/foods',
    method: 'POST',
    data: {food: { name: newFoodName, calories: newFoodCals}}
  })
  .then(function(data) {
    const tableRow = createFoodRow(data)
    $('.top').after(tableRow)
  })
  .fail(function(){
    alert("You Must Enter a name AND calorie total for your food!")
  })
}

$(document).ready(function(){
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0; i < data.length; i++){
      const tableRow = createFoodRow(data, i)
      $('#food-table').append(tableRow)
    }
    $('#food-table').prepend(createTableHead())
    if($('#food-table').hasClass('dairy-foods')){
      $('#food-table tr td.deletor').remove()
      $('#food-table th')[2].remove();
      $('#food-table tr').prepend('<td class="box-check"><input type="checkbox" class="checkbox"></input></td>')
      var fChild = $('#food-table tr.top')[0].firstChild
      $('#food-table tr.top')[0].replaceChild(document.createElement('TD'), fChild)
    }
  })
})

export {
  readFoodCreate,
  readFoodReplace,
  createFood,
  deleteFood,
}
