var API = "http://localhost:3000"

$(document).ready(function(){
  
  $.ajax({
    url: API + '/api/v1/foods/',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0; i < data.length; i++){
      $("table").append('<tr><td class="food-all '+ data[i]['name'].replace(/\s/g, '') + '">' + data[i]['name'] + '</td><td>' +data[i]['calories'] );
    }
  })
  
  var createFood = function() {
    var newFoodName = $("#food_creator input[name='food-name']").val();
    var newFoodCals = $("#food_creator input[name='food-calories']").val();
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'POST',
      data: {food: { name: newFoodName, calories: newFoodCals}}
    })
    .then(function(data) {
        $(".top").after('<tr><td class="food-all '+ data['name'].replace(/\s/g, '') + '">' + data['name'] + '</td><td>' + data['calories'] );
    })
  }
  
  $('#food_creator input[type="submit"]').on('click', createFood);
  $('#food_creator input[type="submit"]').on('click', createFood);
  
})
  
