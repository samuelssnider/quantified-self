var API = "http://localhost:3000"

$(document).ready(function(){
  
  $.ajax({
    url: API + '/api/v1/foods/',
    method: 'GET',
  })
  .then(function(data) {
    for(var i = 0; i < data.length; i++){
      $("table").append('<tr><td>' + data[i]['name'] + '</td><td>' +data[i]['calories'] + '</td></tr>');
    }
  })
  
})
  
