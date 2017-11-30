var API = "http://localhost:3000"

$(document).ready(function(){
  
  var handleError = function(){
    alert("Something went wrong, please try again");
  }
  
  $.ajax({
    url: API + '/api/v1/foods',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0;i < data.length; i ++){
      $('#food-table').append(`<tr><tb>${data[i]["name"]}</tb><tb>${data[i]["calories"]}</tb></tr>`);
    }
  })
  
})
  
