var API = "http://localhost:3000"

$(document).ready(function(){
  
  $.ajax({
    url: API + '/api/v1/foods/',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0; i < data.length; i++){
      $("table").append('<tr><td class="food-all '+ data[i]['name'].replace(/\s/g, '') + '">' + data[i]['name'] + '</td><td>' +data[i]['calories'] + '</td><td><img style="width:20px; margin-left:5px;" src="https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg"/></td></tr>');
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
        $(".top").after('<tr><td class="food-all '+ data['name'].replace(/\s/g, '') + '">' + data['name'] + '</td><td>' + data['calories'] + '</td></tr>');
    })
  }
  
  var editFoodInit = function() {
    console.log("Hey")
  }
  
  $('#food_creator input[type="submit"]').on('click', createFood);
  // $('.food-all').on('click', findEditedFood)
  $('.food-all').on('click', editFoodInit);
})
  
