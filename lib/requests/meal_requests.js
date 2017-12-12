//wrap this whole thing in a class (for ref: http://backend.turing.io/module4/lessons/intro-to-oojs)
//create a new file and class that contains EventHandler, then call those things in here

const API = "http://localhost:3000"
var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'


$(document).ready(function(){

//shows all foods in tables
  fetch('http://localhost:3000/api/v1/meals')
  .then( function(response) {
      response.json().then(function(data) {
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
    debugger
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
       return "no data"}
    }

  var deleteFood = function(e) {
    e.preventDefault();
    debugger
    var deleteFoodId = this.this.parentElement.firstElementChild.classList[1]
    var tableName = $(this).parents()[2].id
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
    var targetElement = $(this).parent();
    return $.ajax({
      url: API + '/api/v1/meals/' + mealId(tableName) + '/foods/' + deleteFoodId,
      method: 'DELETE',
    })
    .then(function(data){
       targetElement.remove();
       colorizeCals();
    })
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


$('#Breakfast-table').on('click','.meals_deletor', deleteFood);
$('#Lunch-table').on('click','.meals_deletor', deleteFood);
$('#Dinner-table').on('click','.meals_deletor', deleteFood);
$('#Snack-table').on('click','.meals_deletor', deleteFood);

})

