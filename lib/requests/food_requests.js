var API = "http://localhost:3000"

$(document).ready(function(){
  
  var handleError = function(){
    alert("Something went wrong, please try again");
  }
  
  var getFoods = function() {
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'GET',
    }).done(function(data) {
      for(i = 0; data.length; i ++){
        $('.food-table').append(`<tr><tb>${data.name}</tb><tb>${data.calories}</tb></tr>`);
      }
    }).fail(function(){
      handleError();
    });
  }
  
  $(window).on("load",getFoods);
})
  
