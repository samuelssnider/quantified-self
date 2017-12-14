import { deleteFood } from '../requests/meal_requests'
$(document).ready(function(){
  $('#Breakfast-table').on('click','.meals_deletor', deleteFood);
  $('#Lunch-table').on('click','.meals_deletor', deleteFood);
  $('#Dinner-table').on('click','.meals_deletor', deleteFood);
  $('#Snack-table').on('click','.meals_deletor', deleteFood);
})