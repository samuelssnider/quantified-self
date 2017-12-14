import { createFood, deleteFood } from '../requests/food_requests'
import { editFoodInit, editTheFood, searchAndLimit} from '../models/food_helpers'

$(document).ready(function(){
  $('#food_creator input[type="submit"]').on('click', createFood);
  $('#food-table').on('click','.food', editFoodInit);
  $('#food-table').on('click','.update', editTheFood);
  $('#food-table').on('click','.deletor', deleteFood);
  $('#filter-name').on('keyup', searchAndLimit);
})