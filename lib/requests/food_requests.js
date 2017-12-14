var API = "http://localhost:3000"
import { createTableHead, createFoodRow, createEditImage } from '../models/food_helpers'

$(document).ready(function(){
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0; i < data.length; i++){
      const tableRow = createFoodRow(data, i)
      $('#food-table').append(tableRow)
    }
    $('#food-table').prepend(createTableHead())
    if($('#food-table').hasClass('dairy-foods')){
      $('#food-table tr td.deletor').remove()
      $('#food-table th')[2].remove();
      $('#food-table tr').prepend('<td class="box-check"><input type="checkbox" class="checkbox"></input></td>')
      var fChild = $('#food-table tr.top')[0].firstChild
      $('#food-table tr.top')[0].replaceChild(document.createElement('TD'), fChild)
    }
  })
  

  // function createTableHead() {
  //   var header = document.createElement('TR')
  //   $(header).addClass('top')
  //   var name   = document.createElement('TH'); name.innerText = "Name";
  //   var cals   = document.createElement('TH'); cals.innerText = "Calories"
  //   var empty  = document.createElement('TH')
  //   header.append(name); header.append(cals); header.append(empty)
  //   return header
  // }

  // function createFoodRow(data, position = -1){
  //   if(position === -1){
  //     data = [data]
  //     position = 0
  //   }
  //   var tableRow = document.createElement('tr');
  //   $(tableRow).addClass('row')
  //   $(tableRow).append('<td class="food ' +data[position]['id'] + '">' + data[position]['name'] + '</td>');
  //   $(tableRow).append('<td class="calories">' +data[position]['calories'] + '</td>');
  //   $(tableRow).append('<td class="deletor '+ data[position]['id']
  //                      +'"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
  //   return tableRow
  // }

  var createFood = function(e) {
    e.preventDefault();
    var newFoodName = $("#food_creator input[name='food-name']").val();
    var newFoodCals = $("#food_creator input[name='food-calories']").val();
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'POST',
      data: {food: { name: newFoodName, calories: newFoodCals}}
    })
    .then(function(data) {
      const tableRow = createFoodRow(data)
      $('.top').after(tableRow)
    })
    .fail(function(){
      alert("You Must Enter a name AND calorie total for your food!")
    })
  }


  // function createEditImage(editID) {
  //   var foodImage = document.createElement('TD')
  //   var foodImg = document.createElement('IMG')
  //   $(foodImage).addClass(editID.toString())
  //   $(foodImg).addClass('update-image')
  //   foodImg.src = updateImageSrc
  //   foodImage.appendChild(foodImg)
  //   return foodImage
  // }

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

  var readFoodReplace = function(editPane, table){
    return $.ajax({
      url: API + '/api/v1/foods/' + editPane.classList[1],
      method: 'GET',
    })
    .then(function(data) {
      const tableRow = createFoodRow(data)
      table.replaceChild(tableRow, editPane.parentElement)
    })
  }

  var readFoodCreate = function(foodId, foot){
    return $.ajax({
      url: API + '/api/v1/foods/' + foodId,
      method: 'GET',
    })
    .then(function(data) {
      const tableRow = createFoodRow(data)
      foot.before(tableRow)
    })
  }

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

  var deleteFood = function(e) {
    e.preventDefault();
    var deleteId = parseInt(this.parentNode.firstChild.classList[1]);
    $.ajax({
      url: API + '/api/v1/meals/', 
      method: 'GET',
    })
    .then(function(data){
      for(var i = 0;i < data.length; i ++){
        for(var j = 0; j < data[i]['foods'].length; j ++){
          if(data[i]['foods'][j]['id'] === deleteId){
            deleteMealFood(data[i]['id'], data[i]['foods'][j]['id'])
            
          }
        }
      }
    })
    return $.ajax({
      url: API + '/api/v1/foods/' + deleteId.toString(),
      method: 'DELETE',
    })
    .then(function(data){
      $(`table tr .${deleteId}`)[0].parentNode.remove()
    })
  }
  
  var deleteMealFood = function(mealId, foodId) {
    return $.ajax({
      url: API + '/api/v1/meals/' + mealId + '/foods/' + foodId,
      method: 'DELETE',
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

  function createMealFood(mealId, foodId, foot) {
    return $.ajax({
      url: API + '/api/v1/meals/' + mealId + '/foods/' + foodId ,
      method: 'POST',
    })
    .then(function(data){
      readFoodCreate(foodId, foot)
    })
  }
  
  
  var addToMeals = function() {
    var boxes = $('#food-table tr td.box-check input')
    for(var i = 0; i < (boxes.length); i ++){
      if(boxes[i].checked){
        createMealFood(mealId, boxes[i].parentElement.nextSibling.classList[1], $(`${table} tfoot`)[1])
      }
    }
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
  
  
  var sortByCalories = function() {
    
    if($(this).hasClass('ascending')){
      rebuildOriginalTable(this)
      var table = $(this.parentElement.parentElement)
      var rows  = table.children('tr.row')
      rows.remove()
      $(this).removeClass('ascending')
      $(this).addClass('cal-head')
    }
    if($(this).hasClass('decending')){
      var table = $(this.parentElement.parentElement)
      var rows  = table.children('tr.row')
      var sorted = rows.sort(function(a, b){
        var keyA = parseInt($(b).children('td.calories')[0].innerText)
        var keyB = parseInt($(a).children('td.calories')[0].innerText)
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
      })
      $(table).append(sorted)
      $(this).removeClass('decending')
      $(this).addClass('ascending')
    }
    if($(this).hasClass('cal-head')) {
      var table = $(this.parentElement.parentElement)
      rows  = table.children('tr.row')
      var sorted = rows.sort(function(a, b) {
        var keyA = parseInt($(a).children('td.calories')[0].innerText)
        var keyB = parseInt($(b).children('td.calories')[0].innerText)
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
      });
      $(rows).remove()
      $(table).append(sorted)
      $(this).removeClass('cal-head')
      $(this).addClass('decending')
    }
    
  }
  
  function rebuildOriginalTable(input) {
    var table = input.parentElement.parentElement.parentElement
    var position
    if(table.id.includes("Breakfast")){position = 0}
    if(table.id.includes("Dinner")){position = 3}
    if(table.id.includes("Snack")){position = 1}
    if(table.id.includes("Lunch")){position = 2}
    fetch('http://localhost:3000/api/v1/meals')
    .then( function(response) {
      response.json().then(function(data) {
        appendFoodToMeal(data[position])
      });
    })
    .then( function (data) {
      getTotalCalories(name);
      getRemainingCalories(total, name);
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
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
  

  $('#food_creator input[type="submit"]').on('click', createFood);
  $('#food-table').on('click','.food', editFoodInit);
  $('#food-table').on('click','.update', editTheFood);
  $('#food-table').on('click','.deletor', deleteFood);
  $('#filter-name').on('keyup', searchAndLimit);
  $('.snack-btn').on('click', addToSnacks)
  $('.dinner-btn').on('click', addToDinner)
  $('.lunch-btn').on('click', addToLunch)
  $('.break-btn').on('click', addToBreakfast)
  $('.meal-table .cal-head').on('click', sortByCalories)
})
