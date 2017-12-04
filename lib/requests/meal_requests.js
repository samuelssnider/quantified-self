//wrap this whole thing in a class (for ref: http://backend.turing.io/module4/lessons/intro-to-oojs)
//create a new file and class that contains EventHandler, then call those things in here

const API = "http://localhost:3000"


$(document).ready(function(){

fetch('http://localhost:3000/api/v1/meals')
  .then(
    function(response) {
      response.json().then(function(data) {
         //console.log(data)
        for(var i = 0; i < data.length; i++){

          $(`#${data[i].name}-table`).append(

            data[i].foods.forEach(function (food){

               $(`#${data[i].name}-table`).append('<tr><td class="'+ food.name +'">' + food.name + '</td><td>' + food.calories );
            })

           );
         }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


})

