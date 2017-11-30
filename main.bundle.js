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
/***/ (function(module, exports) {

	'use strict';

	var API = "http://localhost:3000";

	$(document).ready(function () {

	  $.ajax({
	    url: API + '/api/v1/foods/',
	    method: 'GET'
	  }).then(function (data) {
	    for (var i = 0; i < data.length; i++) {
	      $("table").append('<tr><td class="' + data['name'] + '">' + data[i]['name'] + '</td><td>' + data[i]['calories'] + '</td><td>Edit</td></tr>');
	    }
	  });

	  var createFood = function createFood() {
	    var newFoodName = $("#food_creator input[name='food-name']").val();
	    var newFoodCals = $("#food_creator input[name='food-calories']").val();
	    return $.ajax({
	      url: API + '/api/v1/foods',
	      method: 'POST',
	      data: { food: { name: newFoodName, calories: newFoodCals } }
	    }).then(function (data) {
	      $("table").prepend('<tr><td class="' + data['name'] + '">' + data['name'] + '</td><td>' + data['calories']);
	    });
	  };

	  $('#food_creator input[type="submit"]').on('click', createFood);
	  $('#food_creator input[type="submit"]').on('click', createFood);
	});

/***/ })
/******/ ]);