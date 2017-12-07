//wrap this whole thing in a class (for ref: http://backend.turing.io/module4/lessons/intro-to-oojs)
//create a new file and class that contains EventHandler, then call those things in here

const API = "http://localhost:3000"
var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'


$(document).ready(function(){


//shows all foods
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
    meals.forEach(function (name) {
    let total = getTotalCalories(name);
    getRemainingCalories(total, name);
    })
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
    var foodName = document.createElement('TD'); foodName.innerText = food.name
    var foodCals = document.createElement('TD'); foodCals.innerText = food.calories
    var foodDeletor = document.createElement('TD')
    var foodDelImg = document.createElement('IMG')
    $(foodName).addClass(food.name)
    $(foodDeletor).addClass('deletor')
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


})

