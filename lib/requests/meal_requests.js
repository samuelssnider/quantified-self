//wrap this whole thing in a class (for ref: http://backend.turing.io/module4/lessons/intro-to-oojs)
//create a new file and class that contains EventHandler, then call those things in here

const API = "http://localhost:3000"
var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'


$(document).ready(function(){



//shows all foods
  fetch('http://localhost:3000/api/v1/meals')
  .then( function(response) {
      response.json().then(function(data) {
        for(var i = 0; i < data.length; i++){
          $(`#${data[i].name}-table`).append(
            data[i].foods.forEach(function (food, index){
               $(`#${data[i].name}-table`).append('<tr><td class="'+ food.name +'">' + food.name + '</td><td class="' + data[i].name + index + "cals" + '">' + food.calories + '</td><td class="deletor"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
            })
          );
         }
      });
    }
  )
  .then( function () {
    getTotalCalories();
  })
  //.catch(function(err) {
    //console.log('Fetch Error :-S', err);
  //});

function getTotalCalories() {
    let test = $(".Breakfast0cals").text();
    //Add to iterated over all the created classes
    console.log(test)
  }


function getRemainingCalories() {
  //Add total calories

  }


 //let totalCalories = function (data) {
   //figure out how to select each of the vals for <tr> elements which are numbers

    //for(var i = 0; i < data.length; i++){
      //return $(`${i}cals`).text();
    //}


   //add them

   //this will need to happen per table on index page

 //}


//function getCals() {  $("#Breakfast-table").on("load", function () {
    //let test = $(".Breakfast0cals").text();
    //console.log(test)
  //})}

//getCals();

 //let remainingCalories = function () {
  //$()
 //}

  //$(".total-calories").append(totalCalories)

  //$(".remianing-calories").append(remainingCalories)


})

