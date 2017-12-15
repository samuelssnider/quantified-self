/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Food = __webpack_require__(1);
	var Ajax = __webpack_require__(2);
	var Meals = __webpack_require__(5);
	var mHelpers = __webpack_require__(4);
	var fHelpers = __webpack_require__(3);
	var mListeners = __webpack_require__(6);
	var fListeners = __webpack_require__(7);
	__webpack_require__(8);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	function Food(name, calories) {
	  this.name = name;
	  this.calories = calories;
	}

	Food.prototype.edit = function (name, calories) {
	  this.name = name;
	  this.calories = calories;
	};

	module.exports = Food;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deleteFood = exports.createFood = exports.readFoodReplace = exports.readFoodCreate = undefined;

	var _food_helpers = __webpack_require__(3);

	var _meal_helpers = __webpack_require__(4);

	var API = "https://dan-and-sam-api.herokuapp.com";
	var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg';

	var readFoodCreate = function readFoodCreate(foodId, foot) {
	  return $.ajax({
	    url: API + '/api/v1/foods/' + foodId,
	    method: 'GET'
	  }).then(function (data) {
	    var tableRow = (0, _food_helpers.createFoodRow)(data);
	    foot.before(tableRow);
	  });
	};

	var readFoodReplace = function readFoodReplace(editPane, table) {
	  return $.ajax({
	    url: API + '/api/v1/foods/' + editPane.classList[1],
	    method: 'GET'
	  }).then(function (data) {
	    var tableRow = (0, _food_helpers.createFoodRow)(data);
	    table.replaceChild(tableRow, editPane.parentElement);
	  });
	};

	var deleteFood = function deleteFood(e) {
	  e.preventDefault();
	  var deleteId = parseInt(this.parentNode.firstChild.classList[1]);
	  $.ajax({
	    url: API + '/api/v1/meals/',
	    method: 'GET'
	  }).then(function (data) {
	    for (var i = 0; i < data.length; i++) {
	      for (var j = 0; j < data[i]['foods'].length; j++) {
	        if (data[i]['foods'][j]['id'] === deleteId) {
	          deleteMealFood(data[i]['id'], data[i]['foods'][j]['id']);
	        }
	      }
	    }
	  }).then(function (data) {
	    return $.ajax({
	      url: API + '/api/v1/foods/' + deleteId.toString(),
	      method: 'DELETE'
	    }).then(function (data) {
	      $('table tr .' + deleteId)[0].parentNode.remove();
	    });
	  });
	};

	var deleteMealFood = function deleteMealFood(mealId, foodId) {
	  return $.ajax({
	    url: API + '/api/v1/meals/' + mealId + '/foods/' + foodId,
	    method: 'DELETE'
	  });
	};

	var createFood = function createFood(e) {
	  e.preventDefault();
	  var newFoodName = $("#food_creator input[name='food-name']").val();
	  var newFoodCals = $("#food_creator input[name='food-calories']").val();
	  return $.ajax({
	    url: API + '/api/v1/foods',
	    method: 'POST',
	    data: { food: { name: newFoodName, calories: newFoodCals } }
	  }).then(function (data) {
	    var tableRow = (0, _food_helpers.createFoodRow)(data);
	    $('.top').after(tableRow);
	  }).fail(function () {
	    alert("You Must Enter a name AND calorie total for your food!");
	  });
	};

	$(document).ready(function () {
	  $.ajax({
	    url: API + '/api/v1/foods',
	    method: 'GET'
	  }).then(function (data) {
	    for (var i = 0; i < data.length; i++) {
	      var tableRow = (0, _food_helpers.createFoodRow)(data, i);
	      $('#food-table').append(tableRow);
	    }
	    $('#food-table').prepend((0, _food_helpers.createTableHead)());
	    if ($('#food-table').hasClass('dairy-foods')) {
	      $('#food-table tr td.deletor').remove();
	      $('#food-table th')[2].remove();
	      $('#food-table tr').prepend('<td class="box-check"><input type="checkbox" class="checkbox"></input></td>');
	      var fChild = $('#food-table tr.top')[0].firstChild;
	      $('#food-table tr.top')[0].replaceChild(document.createElement('TD'), fChild);
	    }
	  });
	});

	exports.readFoodCreate = readFoodCreate;
	exports.readFoodReplace = readFoodReplace;
	exports.createFood = createFood;
	exports.deleteFood = deleteFood;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _food_requests = __webpack_require__(2);

	var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg';
	var updateImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Breezeicons-emblems-8-emblem-added.svg/512px-Breezeicons-emblems-8-emblem-added.svg.png';
	var API = "https://dan-and-sam-api.herokuapp.com";


	function createTableHead() {
	  var header = document.createElement('TR');
	  $(header).addClass('top');
	  var name = document.createElement('TH');name.innerText = "Name";
	  var cals = document.createElement('TH');cals.innerText = "Calories";
	  var empty = document.createElement('TH');
	  header.append(name);header.append(cals);header.append(empty);
	  return header;
	}

	function createFoodRow(data) {
	  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

	  if (position === -1) {
	    data = [data];
	    position = 0;
	  }
	  var tableRow = document.createElement('tr');
	  $(tableRow).addClass('row');
	  $(tableRow).append('<td class="food ' + data[position]['id'] + '">' + data[position]['name'] + '</td>');
	  $(tableRow).append('<td class="calories">' + data[position]['calories'] + '</td>');
	  $(tableRow).append('<td class="deletor ' + data[position]['id'] + '"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
	  return tableRow;
	}

	function createEditImage(editID) {
	  var foodImage = document.createElement('TD');
	  var foodImg = document.createElement('IMG');
	  $(foodImage).addClass(editID.toString());
	  $(foodImg).addClass('update-image');
	  foodImg.src = updateImageSrc;
	  foodImage.appendChild(foodImg);
	  return foodImage;
	}

	function setTDGrandparent(outer, inner, innerName, innerPlace) {
	  var grandparent = document.createElement('TD');
	  var parent = document.createElement(outer);
	  var child = document.createElement(inner);
	  child.name = innerName;
	  child.placeholder = innerPlace;
	  grandparent.appendChild(parent);
	  parent.appendChild(child);
	  return grandparent;
	}

	var editFoodInit = function editFoodInit(e) {
	  e.preventDefault();
	  var editID = "update ";
	  editID += this.classList[1].toString();
	  var parent = this.parentElement;
	  var foodImage = createEditImage(editID);
	  var foodDesc = setTDGrandparent('FORM', 'INPUT', 'edit-food-name', this.innerText);
	  var calDesc = setTDGrandparent('FORM', 'INPUT', 'cals-tot', parent.children[1].innerText);
	  parent.replaceChild(foodDesc, this);
	  parent.replaceChild(calDesc, parent.children[1]);
	  parent.replaceChild(foodImage, parent.children[2]);
	};

	var editTheFood = function editTheFood(e) {
	  e.preventDefault();
	  var editFoodId = this.classList[1];
	  var editName = $('input[name="edit-food-name"]')[0].value;
	  var editCals = $('input[name="cals-tot"]')[0].value;
	  var editPane = this;
	  var table = this.parentElement.parentElement;
	  if (editName.length === 0 && editCals.length === 0) {
	    return (0, _food_requests.readFoodReplace)(editPane, table);
	  }
	  if (editName.length === 0) {
	    editName = $('input[name="edit-food-name"]').placeholder;
	  }

	  if (editCals.length === 0) {
	    editCals = $('input[name="cals-tot"]').placeholder;
	  }
	  var parent = this.parentElement;
	  return $.ajax({
	    url: API + '/api/v1/foods/' + editFoodId.toString(),
	    method: 'PUT',
	    data: { food: { name: editName, calories: editCals } }
	  }).then(function (data) {
	    var tableRow = createFoodRow(data);
	    parent.parentElement.replaceChild(tableRow, parent);
	  });
	};

	var searchAndLimit = function searchAndLimit(e) {
	  e.preventDefault();
	  var rows = $('#food-table tr');
	  var filter = $('#filter-name input').val().toLowerCase();
	  rows.hide();
	  $(rows[0]).show();
	  rows.each(function () {
	    var name = $(this).children('.food').text().toLowerCase();
	    if (name.indexOf(filter) >= 0) {
	      $(this).show();
	    }
	  });
	};

	module.exports = {
	  createTableHead: createTableHead,
	  createFoodRow: createFoodRow,
	  createEditImage: createEditImage,
	  setTDGrandparent: setTDGrandparent,
	  editFoodInit: editFoodInit,
	  editTheFood: editTheFood,
	  searchAndLimit: searchAndLimit
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _food_requests = __webpack_require__(2);

	var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg';
	var API = "https://dan-and-sam-api.herokuapp.com";

	function appendFoodToMeal(meal) {
	  $('#' + meal.name + '-table').append(meal.foods.forEach(function (food, index) {
	    appendFoodIndex(meal, food, index);
	  }));
	}

	function appendFoodIndex(meal, food, index) {
	  var row = document.createElement('TR');
	  $(row).addClass('row');
	  var foodName = document.createElement('TD');foodName.innerText = food.name;
	  var foodCals = document.createElement('TD');foodCals.innerText = food.calories;
	  var foodDeletor = document.createElement('TD');
	  var foodDelImg = document.createElement('IMG');
	  $(foodName).addClass(food.name);
	  $(foodName).addClass(food.id.toString());
	  $(foodCals).addClass('calories');
	  $(foodDeletor).addClass('meals_deletor');
	  foodDelImg.src = deleteImageSrc;
	  $(foodDelImg).addClass('del-image');
	  row.appendChild(foodName);
	  row.appendChild(foodCals);
	  row.appendChild(foodDeletor);
	  foodDeletor.appendChild(foodDelImg);
	  $('#' + meal.name + '-table').append(row);
	}

	function getTotalCalories(meal) {
	  var cals = $('#' + meal + '-table .cals').toArray();
	  var totalCals = 0;
	  cals.forEach(function (element) {
	    element = $(element).text();
	    element = Number(element);
	    totalCals += element;
	  });
	  $('#' + meal + '-table td.total-calories').text(totalCals);
	  return totalCals;
	}

	function getRemainingCalories(total, name) {
	  total = Number(total);
	  if (name === "Snack") {
	    $('#' + name + '-table td.remaining-calories').text(-(total - 200));
	  } else if (name === "Breakfast") {
	    $('#' + name + '-table td.remaining-calories').text(-(total - 400));
	  } else if (name === "Lunch") {
	    $('#' + name + '-table td.remaining-calories').text(-(total - 600));
	  } else if (name === "Dinner") {
	    $('#' + name + '-table td.remaining-calories').text(-(total - 800));
	  } else {
	    return "no data";
	  }
	}

	function colorizeCals() {
	  var meals = ["Breakfast", "Lunch", "Snack", "Dinner"];
	  meals.forEach(function (meal) {
	    var target = $('#' + meal + '-table td.remaining-calories');
	    var remainingCals = target.text();
	    remainingCals = parseInt(remainingCals);
	    remainingCals > 0 ? target.css("color", "green") : target.css("color", "red");
	  });
	  meals.forEach(function (meal) {
	    var target = $('.remaining-total td.cals');
	    var totalCals = target.text();
	    totalCals = parseInt(totalCals);
	    totalCals > 0 ? target.css("color", "green") : target.css("color", "red");
	  });
	}

	function appendGrandTotal(grandTotal) {
	  var remainingCals = 2000 - grandTotal;
	  $(".calories-consumed").append('<td>' + grandTotal + '</td>');
	  $(".remaining-total").append('<td class="cals">' + remainingCals + '</td>');
	}

	function mealId(name) {
	  if (name === "Breakfast-table") {
	    return "1";
	  } else if (name === "Snack-table") {
	    return "2";
	  } else if (name === "Lunch-table") {
	    return "3";
	  } else if (name === "Dinner-table") {
	    return "4";
	  } else {
	    alert("can't delete");
	  };
	}

	var sortByCalories = function sortByCalories() {
	  if ($(this).hasClass('ascending')) {
	    rebuildOriginalTable(this);
	    var table = $(this.parentElement.parentElement);
	    var rows = table.children('tr.row');
	    rows.remove();
	    $(this).removeClass('ascending');
	    $(this).addClass('cal-head');
	  }
	  if ($(this).hasClass('decending')) {
	    var table = $(this.parentElement.parentElement);
	    var rows = table.children('tr.row');
	    var sorted = rows.sort(function (a, b) {
	      var keyA = parseInt($(b).children('td.calories')[0].innerText);
	      var keyB = parseInt($(a).children('td.calories')[0].innerText);
	      // Compare the 2 dates
	      if (keyA < keyB) return -1;
	      if (keyA > keyB) return 1;
	      return 0;
	    });
	    $(table).append(sorted);
	    $(this).removeClass('decending');
	    $(this).addClass('ascending');
	  }
	  if ($(this).hasClass('cal-head')) {
	    var table = $(this.parentElement.parentElement);
	    rows = table.children('tr.row');
	    var sorted = rows.sort(function (a, b) {
	      var keyA = parseInt($(a).children('td.calories')[0].innerText);
	      var keyB = parseInt($(b).children('td.calories')[0].innerText);
	      // Compare the 2 dates
	      if (keyA < keyB) return -1;
	      if (keyA > keyB) return 1;
	      return 0;
	    });
	    $(rows).remove();
	    $(table).append(sorted);
	    $(this).removeClass('cal-head');
	    $(this).addClass('decending');
	  }
	};

	function rebuildOriginalTable(input) {
	  var table = input.parentElement.parentElement.parentElement;
	  var position;
	  if (table.id.includes("Breakfast")) {
	    position = 0;
	  }
	  if (table.id.includes("Dinner")) {
	    position = 3;
	  }
	  if (table.id.includes("Snack")) {
	    position = 1;
	  }
	  if (table.id.includes("Lunch")) {
	    position = 2;
	  }
	  fetch('https://dan-and-sam-api.herokuapp.com/api/v1/meals').then(function (response) {
	    response.json().then(function (data) {
	      appendFoodToMeal(data[position]);
	    });
	  }).then(function (data) {
	    var total = getTotalCalories(name);
	    getRemainingCalories(total, name);
	  }).catch(function (err) {
	    console.log('Fetch Error :-S', err);
	  });
	}

	var addToSnacks = function addToSnacks() {
	  var boxes = $('#food-table tr td.box-check input');
	  for (var i = 0; i < boxes.length; i++) {
	    if (boxes[i].checked) {
	      createMealFood(2, boxes[i].parentElement.nextSibling.classList[1], $('#Snack-table tfoot')[1]);
	      boxes[i].checked = false;
	    }
	  }
	};

	var addToDinner = function addToDinner() {
	  var boxes = $('#food-table tr td.box-check input');
	  for (var i = 0; i < boxes.length; i++) {
	    if (boxes[i].checked) {
	      createMealFood(4, boxes[i].parentElement.nextSibling.classList[1], $('#Dinner-table tfoot')[1]);
	      boxes[i].checked = false;
	    }
	  }
	};

	var addToLunch = function addToLunch() {
	  var boxes = $('#food-table tr td.box-check input');
	  for (var i = 0; i < boxes.length; i++) {
	    if (boxes[i].checked) {
	      createMealFood(3, boxes[i].parentElement.nextSibling.classList[1], $('#Lunch-table tfoot')[1]);
	      boxes[i].checked = false;
	    }
	  }
	};

	var addToBreakfast = function addToBreakfast() {
	  var boxes = $('#food-table tr td.box-check input');
	  for (var i = 0; i < boxes.length; i++) {
	    if (boxes[i].checked) {
	      createMealFood(1, boxes[i].parentElement.nextSibling.classList[1], $('#Breakfast-table tfoot')[1]);
	      boxes[i].checked = false;
	    }
	  }
	};

	function createMealFood(mealId, foodId, foot) {
	  return $.ajax({
	    url: API + '/api/v1/meals/' + mealId + '/foods/' + foodId,
	    method: 'POST'
	  }).then(function (data) {
	    (0, _food_requests.readFoodCreate)(foodId, foot);
	  });
	}

	module.exports = {
	  appendFoodToMeal: appendFoodToMeal,
	  appendFoodIndex: appendFoodIndex,
	  getTotalCalories: getTotalCalories,
	  getRemainingCalories: getRemainingCalories,
	  colorizeCals: colorizeCals,
	  appendGrandTotal: appendGrandTotal,
	  rebuildOriginalTable: rebuildOriginalTable,
	  mealId: mealId,
	  sortByCalories: sortByCalories,
	  addToSnacks: addToSnacks,
	  addToBreakfast: addToBreakfast,
	  addToLunch: addToLunch,
	  addToDinner: addToDinner,
	  createMealFood: createMealFood
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _meal_helpers = __webpack_require__(4);

	var API = "https://dan-and-sam-api.herokuapp.com"; //wrap this whole thing in a class (for ref: http://backend.turing.io/module4/lessons/intro-to-oojs)
	//create a new file and class that contains EventHandler, then call those things in here


	var deleteFood = function deleteFood(e) {
	  e.preventDefault();
	  var list = this.parentElement.firstElementChild.classList;
	  var deleteFoodId = list[list.length - 1];
	  var tableName = $(this).parents()[2].id;
	  var targetElement = this.parentElement;
	  return $.ajax({
	    url: API + '/api/v1/meals/' + (0, _meal_helpers.mealId)(tableName) + '/foods/' + deleteFoodId,
	    method: 'DELETE'
	  }).then(function (data) {
	    targetElement.remove();
	    (0, _meal_helpers.colorizeCals)();
	  });
	};

	$(document).ready(function () {

	  //shows all foods in tables
	  fetch('https://dan-and-sam-api.herokuapp.com/api/v1/meals').then(function (response) {
	    response.json().then(function (data) {
	      for (var i = 0; i < data.length; i++) {
	        (0, _meal_helpers.appendFoodToMeal)(data[i]);
	      }
	    });
	  }).then(function () {
	    var meals = ["Breakfast", "Lunch", "Dinner", "Snack"];
	    var grandTotal = 0;
	    meals.forEach(function (name) {
	      var total = (0, _meal_helpers.getTotalCalories)(name);
	      (0, _meal_helpers.getRemainingCalories)(total, name);
	      grandTotal += total;
	    });
	    (0, _meal_helpers.appendGrandTotal)(grandTotal);
	    (0, _meal_helpers.colorizeCals)();
	  }).catch(function (err) {
	    console.log('Fetch Error :-S', err);
	  });

	  // $('#Breakfast-table').on('click','.meals_deletor', deleteFood);
	  // $('#Lunch-table').on('click','.meals_deletor', deleteFood);
	  // $('#Dinner-table').on('click','.meals_deletor', deleteFood);
	  // $('#Snack-table').on('click','.meals_deletor', deleteFood);
	});

	module.exports = {
	  deleteFood: deleteFood
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _meal_requests = __webpack_require__(5);

	var _meal_helpers = __webpack_require__(4);

	$(document).ready(function () {
	  $('#Breakfast-table').on('click', '.meals_deletor', _meal_requests.deleteFood);
	  $('#Lunch-table').on('click', '.meals_deletor', _meal_requests.deleteFood);
	  $('#Dinner-table').on('click', '.meals_deletor', _meal_requests.deleteFood);
	  $('#Snack-table').on('click', '.meals_deletor', _meal_requests.deleteFood);
	  $('.snack-btn').on('click', _meal_helpers.addToSnacks);
	  $('.dinner-btn').on('click', _meal_helpers.addToDinner);
	  $('.lunch-btn').on('click', _meal_helpers.addToLunch);
	  $('.break-btn').on('click', _meal_helpers.addToBreakfast);
	  $('.meal-table .cal-head').on('click', _meal_helpers.sortByCalories);
	});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _food_requests = __webpack_require__(2);

	var _food_helpers = __webpack_require__(3);

	$(document).ready(function () {
	  $('#food_creator input[type="submit"]').on('click', _food_requests.createFood);
	  $('#food-table').on('click', '.food', _food_helpers.editFoodInit);
	  $('#food-table').on('click', '.update', _food_helpers.editTheFood);
	  $('#food-table').on('click', '.deletor', _food_requests.deleteFood);
	  $('#filter-name').on('keyup', _food_helpers.searchAndLimit);
	});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./myCss.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./myCss.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "div {\n  display: block;\n  margin: 100; }\n\ntable, th, td {\n  border: 1px solid black; }\n\n.wrapper {\n  display: grid;\n  grid-template-columns: 45% 45%;\n  grid-gap: 5px;\n  color: #444; }\n\n.box {\n  border-radius: 0px;\n  padding: 10px;\n  font-size: 100%; }\n\n.del-image {\n  width: 20px;\n  text-align: center;\n  margin-left: 20%;\n  margin-right: 20%; }\n\n.update-image {\n  width: 20px;\n  text-align: center;\n  margin-left: 20%;\n  margin-right: 12px; }\n\n.blue-button {\n  background-color: #99ccff; }\n\n.twenty-eight {\n  width: 20em; }\n", ""]);

	// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);