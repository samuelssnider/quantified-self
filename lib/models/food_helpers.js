var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'
var updateImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Breezeicons-emblems-8-emblem-added.svg/512px-Breezeicons-emblems-8-emblem-added.svg.png'
var API = "http://localhost:3000"
import { readFoodCreate, readFoodReplace } from '../requests/food_requests'

function createTableHead() {
  var header = document.createElement('TR')
  $(header).addClass('top')
  var name   = document.createElement('TH'); name.innerText = "Name";
  var cals   = document.createElement('TH'); cals.innerText = "Calories"
  var empty  = document.createElement('TH')
  header.append(name); header.append(cals); header.append(empty)
  return header
}

function createFoodRow(data, position = -1){
  if(position === -1){
    data = [data]
    position = 0
  }
  var tableRow = document.createElement('tr');
  $(tableRow).addClass('row')
  $(tableRow).append('<td class="food ' +data[position]['id'] + '">' + data[position]['name'] + '</td>');
  $(tableRow).append('<td class="calories">' +data[position]['calories'] + '</td>');
  $(tableRow).append('<td class="deletor '+ data[position]['id']
                     +'"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
  return tableRow
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

var editFoodInit = function(e) {
  e.preventDefault();
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

var editTheFood = function(e) {
  e.preventDefault();
  var editFoodId = this.classList[1];
  var editName = $('input[name="edit-food-name"]')[0].value;
  var editCals = $('input[name="cals-tot"]')[0].value;
  var editPane = this
  var table = this.parentElement.parentElement
  if(editName.length === 0 && editCals.length === 0){
    return readFoodReplace(editPane, table);
  }
  if(editName.length === 0){
    editName = $('input[name="edit-food-name"]').placeholder;
  }

  if(editCals.length === 0){
    editCals = $('input[name="cals-tot"]').placeholder;
  }
  var parent = this.parentElement
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

var searchAndLimit = function(e) {
  e.preventDefault();
  var rows = $('#food-table tr')
  var filter = $('#filter-name input').val().toLowerCase();
  rows.hide();
  $(rows[0]).show();
  rows.each(function() {
    var name = $(this).children('.food').text().toLowerCase();
    if (name.indexOf(filter) >= 0) {
      $(this).show();
    }
  })
}

var addToSnacks = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(2, boxes[i].parentElement.nextSibling.classList[1], $('#Snack-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

var addToDinner = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(4, boxes[i].parentElement.nextSibling.classList[1], $('#Dinner-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

var addToLunch = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(3, boxes[i].parentElement.nextSibling.classList[1], $('#Lunch-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

var addToBreakfast = function() {
  var boxes = $('#food-table tr td.box-check input')
  for(var i = 0; i < (boxes.length); i ++){
    if(boxes[i].checked){
      createMealFood(1, boxes[i].parentElement.nextSibling.classList[1], $('#Breakfast-table tfoot')[1])
      boxes[i].checked = false
    }
  }
}

function createMealFood(mealId, foodId, foot) {
  return $.ajax({
    url: API + '/api/v1/meals/' + mealId + '/foods/' + foodId ,
    method: 'POST',
  })
  .then(function(data){
    readFoodCreate(foodId, foot)
  })
}

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
  $(foodCals).addClass('calories')
  $(foodDeletor).addClass('deletor')
  foodDelImg.src = deleteImageSrc
  $(foodDelImg).addClass('del-image')
  row.appendChild(foodName);
  row.appendChild(foodCals);
  row.appendChild(foodDeletor);
  foodDeletor.appendChild(foodDelImg)
  $(`#${meal.name}-table`).append(row)
}

module.exports = {
  createTableHead: createTableHead,
  createFoodRow: createFoodRow,
  createEditImage: createEditImage,
  setTDGrandparent: setTDGrandparent,
  editFoodInit: editFoodInit,
  createMealFood: createMealFood,
  appendFoodIndex: appendFoodIndex,
  appendFoodToMeal: appendFoodToMeal,
  editTheFood,
  addToSnacks,
  addToBreakfast,
  addToLunch,
  addToDinner,
  searchAndLimit,
}