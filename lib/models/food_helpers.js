var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'
var updateImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Breezeicons-emblems-8-emblem-added.svg/512px-Breezeicons-emblems-8-emblem-added.svg.png'
var API = "https://dan-and-sam-api.herokuapp.com"
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


module.exports = {
  createTableHead: createTableHead,
  createFoodRow: createFoodRow,
  createEditImage: createEditImage,
  setTDGrandparent: setTDGrandparent,
  editFoodInit: editFoodInit,
  editTheFood,
  searchAndLimit,
}