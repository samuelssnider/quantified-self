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
      $(tableRow).append('<td class="deletor '+ data[i]['id'] +'"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
      $('table').append(tableRow);
    }
    $('table').prepend("<th></th></tr>")
    $('table').prepend("<th>Calories</th>")
    $('table').prepend("<th>Name</th>")
    $('table').prepend("<tr class='top'>")
  })
  var createFood = function() {
    debugger
    var newFoodName = $("#food_creator input[name='food-name']").val();
    var newFoodCals = $("#food_creator input[name='food-calories']").val();
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'POST',
      data: {food: { name: newFoodName, calories: newFoodCals}}
    })
    .then(function(data) {
      $("table").prepend('<tr><td class="food-all '+ data['name'].replace(/\s/g, '') + '">' + data['name'] + '</td><td>' + data['calories'] + '</td><td class="deletor '+ data[i]['id'] +'"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
    })
  }
  
  
  function createEditImage(editID) {
    var foodImage = document.createElement('TD')
    var foodImg = document.createElement('IMG')
    $(foodImage).addClass(editID.toString())
    $(foodImg).addClass('update-image')
    foodImg.src = updateImageSrc
    foodImage.appendChild(foodImg)
    return foodImage
  }
  
  function setTDGrandparent(outer, inner, innerName, innerPlace) {
    var grandparent = document.createElement('TD')
    var parent = document.createElement(outer)
    var child = document.createElement(inner)
    child.name = innerName;
    child.placeholder = innerPlace;
    grandparent.appendChild(parent)
    parent.appendChild(child)
    return grandparent
  }
  
  var editFoodInit = function() {
    var editID = "update "
    editID += this.classList[1].toString()
    var parent = this.parentElement
    var foodImage = createEditImage(editID)
    var foodDesc = setTDGrandparent('FORM', 'INPUT', 'food-name', this.innerText)
    var calDesc = setTDGrandparent('FORM', 'INPUT', 'food-name', parent.children[1].innerText)
    parent.replaceChild(foodDesc, this)
    parent.replaceChild(calDesc, parent.children[1])
    parent.replaceChild(foodImage, parent.children[2])
  };
  
  var editTheFood = function() {
    var editFoodId = this.classList[1];
    debugger
    var editName = $('td input[name="food-name"]')[0].value;
    var editCals = $('td input[name="cals-tot"]')[0].value;
    
    return $.ajax({
      url: API + '/api/v1/foods/' + editFoodId.toString(),
      method: 'PUT',
      data: {food: { name: editName, calories: editCals}},
    })
    .then(function(data){
      console.log("why is this taking so long?")
    })
  }
  
  var deleteFood = function() {
    var deleteId = parseInt(this.parentNode.firstChild.classList[1]);
    
    return $.ajax({
      url: API + '/api/v1/foods/' + deleteId.toString(),
      method: 'DELETE',
    })
    .then(function(data){
      $(`table tr .${deleteId}`)[0].parentNode.remove()
    })
  }
  
  // var editTheFood = function() {
  //   var editFoodId = this.classList[1];
  //   var editName = $("td input[name='food-name']");
  //   var editCals = $("td input[name='cals-tot']");
  //   return $.ajax({
  //     url: API + '/api/v1/foods/' + editFoodId,
  //     method: 'PUT',
  //     data: { food: {name: editName, calories = editCals}},
  //   }).done(function(data) {
  //     $('#latest-domains').append('<p class="domain">Your Domain with id '+ updateDomainId +' has been updated</p>');
  //   }).fail(function() {
  //     handleError();
  //   })
  // }
  
  $('#food_creator input[type="submit"]').on('click', createFood);
  // $('.food-all').on('click', findEditedFood)
  $('#food-table').on('click','.food', editFoodInit);
  $('#food-table').on('click','.update', editTheFood);
  $('#food-table').on('click','.deletor', deleteFood);
})
  
