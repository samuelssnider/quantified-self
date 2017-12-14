var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'

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

module.exports = {
  appendFoodToMeal: appendFoodToMeal,
  appendFoodIndex: appendFoodIndex,
  getTotalCalories: getTotalCalories,
  getRemainingCalories: getRemainingCalories,
  colorizeCals: colorizeCals,
  appendGrandTotal: appendGrandTotal,
  mealId: mealId
}