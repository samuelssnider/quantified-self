var deleteImageSrc = 'https://assets.publishing.service.gov.uk/media/55b9f41b40f0b6151f000019/sign-giving-order-no-entry-vehicular-traffic.jpg'


function createTableHead() {
  var header = document.createElement('TR')
  $(header).addClass('top')
  var name   = document.createElement('TH'); name.innerText = "Name";
  var cals   = document.createElement('TH'); cals.innerText = "Calories"
  var empty  = document.createElement('TH')
  header.append(name); header.append(cals); header.append(empty)
  return header
}

function createFoodRow(data, position = -1){
  if(position === -1){
    data = [data]
    position = 0
  }
  var tableRow = document.createElement('tr');
  $(tableRow).addClass('row')
  $(tableRow).append('<td class="food ' +data[position]['id'] + '">' + data[position]['name'] + '</td>');
  $(tableRow).append('<td class="calories">' +data[position]['calories'] + '</td>');
  $(tableRow).append('<td class="deletor '+ data[position]['id']
                     +'"><img class="del-image" src="' + deleteImageSrc + '"/></td></tr>');
  return tableRow
}

module.exports = {
  createTableHead: createTableHead,
  createFoodRow: createFoodRow
}