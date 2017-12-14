import { deleteFood } from '../requests/meal_requests'
import {  addToSnacks, addToBreakfast, addToDinner, addToLunch, sortByCalories,
          createMealFood, appendFoodIndex, appendFoodToMeal } from '../models/meal_helpers'
$(document).ready(function(){
  $('#Breakfast-table').on('click','.meals_deletor', deleteFood);
  $('#Lunch-table').on('click','.meals_deletor', deleteFood);
  $('#Dinner-table').on('click','.meals_deletor', deleteFood);
  $('#Snack-table').on('click','.meals_deletor', deleteFood);
  $('.snack-btn').on('click', addToSnacks)
  $('.dinner-btn').on('click', addToDinner)
  $('.lunch-btn').on('click', addToLunch)
  $('.break-btn').on('click', addToBreakfast)
  $('.meal-table .cal-head').on('click', sortByCalories)
})