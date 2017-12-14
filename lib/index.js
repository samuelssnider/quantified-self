var Food = require('./models/food');
var Ajax = require('./requests/food_requests.js');
var Meals = require('./requests/meal_requests.js');
var mHelpers = require('./models/meal_helpers.js')
var fHelpers = require('./models/food_helpers.js')
var mListeners = require('./event_listeners/meal_listeners')
var fListeners = require('./event_listeners/food_listeners')
require('./scss/myCss.scss');
