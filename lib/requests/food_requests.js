var API = "http://localhost:3000"
var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'
var updateImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Breezeicons-emblems-8-emblem-added.svg/512px-Breezeicons-emblems-8-emblem-added.svg.png'
$(document).ready(function(){
  
  $.ajax({
    url: API + '/api/v1/foods/',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0; i < data.length; i++){
      const tableRow = document.createElement('tr');
      $(tableRow).addClass();
      $(tableRow).addClass('food-all')
      $(tableRow).append('<td class="food ' +data[i]['id'] + '">' + data[i]['name'] + '</td>');
      $(tableRow).append('<td>' +data[i]['calories'] + '</td>');
      $(tableRow).append('<td><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
      $('table').append(tableRow);
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
    // var editID = this.firstChild.classList[0].substr(-1)
    console.log(this)
    var editID = this.firstChild.classList;
    var foodDesc = document.createElement('TD');
    var calDesc = document.createElement('TD');
    var foodImage = document.createElement('TD')
    var nameForm = document.createElement('FORM');
    var calForm = document.createElement('FORM');
    var foodName = document.createElement('INPUT');
    var foodCals = document.createElement('INPUT');
    var foodSubmit = document.createElement('BUTTON');
    var foodImg = document.createElement('IMG')
    foodImg.src = updateImageSrc
    foodImg.style = "width:20px; margin-left:5px;margin-right:5px"
    foodImage.appendChild(foodImg)
    nameForm.appendChild(foodName)
    calForm.appendChild(foodCals)
    foodDesc.appendChild(nameForm)
    calDesc.appendChild(calForm)
    this.parentElement.replaceChild(foodDesc, this)
    foodDesc.parentElement.replaceChild(calDesc, foodDesc.parentElement.children[1])
    foodDesc.parentElement.replaceChild(foodImage, foodDesc.parentElement.children[2])
    
  };
  
  $('#food_creator input[type="submit"]').on('click', createFood);
  // $('.food-all').on('click', findEditedFood)
  $('table').on('click','.food', editFoodInit);
})
  
