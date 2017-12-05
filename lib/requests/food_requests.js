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
      const tableRow = createFoodRow(data, i)
      $('table').append(tableRow)
    }
    $('table').prepend(createTableHead())
  })
  
  function createFoodRow(data, position = -1){
    if(position === -1){
      data = [data]
      position = 0
    }
    var tableRow = document.createElement('tr');
    $(tableRow).addClass();
    $(tableRow).addClass('food-all')
    $(tableRow).append('<td class="food ' +data[position]['id'] + '">' + data[position]['name'] + '</td>');
    $(tableRow).append('<td>' +data[position]['calories'] + '</td>');
    $(tableRow).append('<td class="deletor '+ data[position]['id']
    +'"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
    return tableRow
  }
  
  function createTableHead() {
    var header = document.createElement('TR')
    var name   = document.createElement('TH'); name.innerText = "Name";
    var cals   = document.createElement('TH'); cals.innerText = "Calories"
    var empty  = document.createElement('TH')
    header.append(name); header.append(cals); header.append(empty)
    return header
  }
  
  var createFood = function() {
    var newFoodName = $("#food_creator input[name='food-name']").val();
    var newFoodCals = $("#food_creator input[name='food-calories']").val();
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'POST',
      data: {food: { name: newFoodName, calories: newFoodCals}}
    })
    .then(function(data) {
      const tableRow = createFoodRow(data)
      $('table').prepend(tableRow)
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
    var foodDesc = setTDGrandparent('FORM', 'INPUT', 'edit-food-name', this.innerText)
    var calDesc = setTDGrandparent('FORM', 'INPUT', 'cals-tot', parent.children[1].innerText)
    parent.replaceChild(foodDesc, this)
    parent.replaceChild(calDesc, parent.children[1])
    parent.replaceChild(foodImage, parent.children[2])
  };
  
  var editTheFood = function() {
    var editFoodId = this.classList[1];
    var editName = $('input[name="edit-food-name"]')[0].value;
    var editCals = $('input[name="cals-tot"]')[0].value;
    var parent = this.parentElement
    debugger
    return $.ajax({
      url: API + '/api/v1/foods/' + editFoodId.toString(),
      method: 'PUT',
      data: {food: { name: editName, calories: editCals}},
    })
    .then(function(data){
      const tableRow = createFoodRow(data)
      parent.parentElement.replaceChild(tableRow, parent)
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
  

  
  $('#food_creator input[type="submit"]').on('click', createFood);
  // $('.food-all').on('click', findEditedFood)
  $('#food-table').on('click','.food', editFoodInit);
  $('#food-table').on('click','.update', editTheFood);
  $('#food-table').on('click','.deletor', deleteFood);
})
  
