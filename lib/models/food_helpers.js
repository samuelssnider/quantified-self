function createTableHead() {
  var header = document.createElement('TR')
  $(header).addClass('top')
  var name   = document.createElement('TH'); name.innerText = "Name";
  var cals   = document.createElement('TH'); cals.innerText = "Calories"
  var empty  = document.createElement('TH')
  header.append(name); header.append(cals); header.append(empty)
  return header
}

module.exports = {
  createTableHead: createTableHead
}