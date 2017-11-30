var API = "http://localhost:3000"

$(document).ready(function(){
  
  $.ajax({
    url: API + '/api/v1/foods/',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0; i < data.length; i++){
      $("table").append('<tr><td>' + data[i]['name'] + '</td><td>' +data[i]['calories'] + '</td></tr>');
    }
  })
  
  var createFood = function() {
    var newFoodName = $("#food_creator input[name='food-name']").val();
    var newFoodCals = $("#food_creator input[name='food-calories']").val();
    debugger
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'POST',
      data: {food: { name: newFoodName, calories: newFoodCals}}
    })
    .then(function(data) {
        $("table").append('<tr><td>' + data['name'] + '</td><td>' +data['calories'] + '</td></tr>');
    })
  }
  
  $('#food_creator input[type="submit"]').on('click', createFood);
  
})
  
