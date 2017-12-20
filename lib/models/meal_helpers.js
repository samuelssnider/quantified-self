var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'
var API = "http://localhost:3000"
import { readFoodCreate } from '../requests/food_requests'

function appendFoodToMeal(meal) {
  $(`#${meal.name}-table`).append(
    meal.foods.forEach(function (food, index){
      appendFoodIndex(meal, food, index)
    })
  )  
}

function appendFoodIndex(meal, food, index){
  var row = document.createElement('TR')
  $(row).addClass('row')
  var foodName = document.createElement('TD'); foodName.innerText = food.name
  var foodCals = document.createElement('TD'); foodCals.innerText = food.calories
  var foodDeletor = document.createElement('TD')
  var foodDelImg = document.createElement('IMG')
  $(foodName).addClass(food.name)
  $(foodName).addClass(food.id.toString())
  $(foodCals).addClass('calories')
  $(foodDeletor).addClass('meals_deletor')
  foodDelImg.src = deleteImageSrc
  $(foodDelImg).addClass('del-image')
  row.appendChild(foodName);
  row.appendChild(foodCals);
  row.appendChild(foodDeletor);
  foodDeletor.appendChild(foodDelImg)
  $(`#${meal.name}-table`).append(row)
}

function getTotalCalories(meal) {
  let cals = $(`#${meal}-table .cals`).toArray();
  let totalCals = 0
  cals.forEach(function (element) {
    element = $(element).text();
    element = Number(element)
    totalCals += element
  })
  $(`#${meal}-table td.total-calories`).text(totalCals);
  return totalCals
}


function getRemainingCalories(total, name) {
  total = Number(total)
  if (name === "Snack"){
     $(`#${name}-table td.remaining-calories`).text(-(total - 200));
  } else if (name === "Breakfast") {
     $(`#${name}-table td.remaining-calories`).text(-(total - 400));
  } else if (name === "Lunch") {
     $(`#${name}-table td.remaining-calories`).text(-(total - 600));
  } else if (name === "Dinner") {
     $(`#${name}-table td.remaining-calories`).text(-(total - 800));
  } else {
     return "no data"
  }
}

function colorizeCals() {
  let meals = ["Breakfast", "Lunch", "Snack", "Dinner"]
  meals.forEach(function (meal) {
    let target =  $(`#${meal}-table td.remaining-calories`)
    let remainingCals = target.text();
    remainingCals = parseInt(remainingCals)
    remainingCals > 0 ? target.css("color", "green") : target.css("color", "red");
  })
  meals.forEach(function (meal) {
    let target =  $(`.remaining-total td.cals`)
    let totalCals = target.text();
    totalCals = parseInt(totalCals)
    totalCals > 0 ? target.css("color", "green") : target.css("color", "red");
  })
}

function appendGrandTotal (grandTotal) {
 let remainingCals = 2000 - grandTotal
  $(".calories-consumed").append('<td>' + grandTotal + '</td>')
  $(".remaining-total").append( '<td class="cals">' + remainingCals + '</td>')
}

function mealId(name) {
  if(name === "Breakfast-table") {
   return ("1")
   }
 else if(name === "Snack-table") {
   return "2"
   }
 else if(name === "Lunch-table") {
   return "3"
   }
 else if(name === "Dinner-table") {
   return "4"
   }
 else {
     alert("can't delete")
   };
}

var sortByCalories = function() {
  if($(this).hasClass('ascending')){
    rebuildOriginalTable(this)
    var table = $(this.parentElement.parentElement)
    var rows  = table.children('tr.row')
    rows.remove()
    $(this).removeClass('ascending')
    $(this).addClass('cal-head')
  }
  if($(this).hasClass('decending')){
    var table = $(this.parentElement.parentElement)
    var rows  = table.children('tr.row')
    var sorted = rows.sort(function(a, b){
      var keyA = parseInt($(b).children('td.calories')[0].innerText)
      var keyB = parseInt($(a).children('td.calories')[0].innerText)
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
    })
    $(table).append(sorted)
    $(this).removeClass('decending')
    $(this).addClass('ascending')
  }
  if($(this).hasClass('cal-head')) {
    var table = $(this.parentElement.parentElement)
    rows  = table.children('tr.row')
    var sorted = rows.sort(function(a, b) {
      var keyA = parseInt($(a).children('td.calories')[0].innerText)
      var keyB = parseInt($(b).children('td.calories')[0].innerText)
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
    });
    $(rows).remove()
    $(table).append(sorted)
    $(this).removeClass('cal-head')
    $(this).addClass('decending')
  }
  
}

function rebuildOriginalTable(input) {
  var table = input.parentElement.parentElement.parentElement
  var position
  if(table.id.includes("Breakfast")){position = 0}
  if(table.id.includes("Dinner")){position = 3}
  if(table.id.includes("Snack")){position = 1}
  if(table.id.includes("Lunch")){position = 2}
  fetch('http://localhost:3000/api/v1/meals')
  .then( function(response) {
    response.json().then(function(data) {
      appendFoodToMeal(data[position])
    });
  })
  .then( function (data) {
    var total = getTotalCalories(name);
    getRemainingCalories(total, name);
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

var addToSnacks = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(2, boxes[i].parentElement.nextSibling.classList[1], $('#Snack-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

var addToDinner = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(4, boxes[i].parentElement.nextSibling.classList[1], $('#Dinner-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

var addToLunch = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(3, boxes[i].parentElement.nextSibling.classList[1], $('#Lunch-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

var addToBreakfast = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(1, boxes[i].parentElement.nextSibling.classList[1], $('#Breakfast-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

function createMealFood(mealId, foodId, foot) {
  return $.ajax({
    url: API + '/api/v1/meals/' + mealId + '/foods/' + foodId ,
    method: 'POST',
  })
  .then(function(data){
    readFoodCreate(foodId, foot)
  })
}

module.exports = {
  appendFoodToMeal: appendFoodToMeal,
  appendFoodIndex: appendFoodIndex,
  getTotalCalories: getTotalCalories,
  getRemainingCalories: getRemainingCalories,
  colorizeCals: colorizeCals,
  appendGrandTotal: appendGrandTotal,
  rebuildOriginalTable: rebuildOriginalTable,
  mealId: mealId,
  sortByCalories,
  addToSnacks,
  addToBreakfast,
  addToLunch,
  addToDinner,
  createMealFood: createMealFood,
}