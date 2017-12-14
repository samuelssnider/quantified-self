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

module.exports = {
  appendFoodToMeal: appendFoodToMeal,
  appendFoodIndex: appendFoodIndex
}