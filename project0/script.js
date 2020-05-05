const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_ITEM_DIV: 'main-div',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  TODO_DELETE_BUTTON: 'todo-delete-button',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const todoTitle = document.getElementById('todo-title')

const todoListArr = []
const counter = (function() {
    let count = 0;
    return function() {
        return ++count;
    }
}());

function newTodo() {
  if(todoTitle === null || todoTitle.value === undefined || todoTitle.value.trim() === "")
  {
      alert("Please enter a valid TO DO Title")
      return
  }
  createTodoListItem(todoTitle)
  recalculateItemCounts()
}

function createTodoListItem(todoTitle){
  const checkboxId = "checkbox" + counter()
  var linebreak = document.createElement("br");

  // Creating a parent div
  var mainLiDiv = document.createElement("div")
  addClass(mainLiDiv, classNames.TODO_ITEM_DIV)

  //Creating Checkbox
  var checkboxDiv = document.createElement("div")
  var checkboxnode = document.createElement("input")
  checkboxnode.setAttribute("type", "checkbox")
  checkboxnode.setAttribute("id", checkboxId)
  checkboxnode.checkboxId = checkboxId;
  checkboxnode.addEventListener('change', onCheckboxValueChange, false)
  addClass(checkboxDiv,classNames.TODO_CHECKBOX)
  checkboxDiv.appendChild(checkboxnode)

  //Creating Todo Text element
  var titleDiv = document.createElement("div")
  var textnode = document.createTextNode(todoTitle.value)
  addClass(titleDiv,classNames.TODO_TEXT)
  titleDiv.appendChild(textnode)

  //Creating Todo delete button
  var delButtonDiv = document.createElement("div")
  var delButton = document.createElement("button")
  delButton.innerHTML="Delete"
  delButton.setAttribute("id", checkboxId)
  delButton.checkboxId = checkboxId;
  delButton.addEventListener('click', onDelButtonClick, false);
  addClass(delButtonDiv,classNames.TODO_DELETE)
  addClass(delButton,classNames.TODO_DELETE_BUTTON)
  delButtonDiv.appendChild(delButton)

  //Adding to the mainLiDiv
  mainLiDiv.appendChild(checkboxDiv)
  mainLiDiv.appendChild(titleDiv)
  mainLiDiv.appendChild(delButtonDiv)

  //Creating a list item and adding all the elements
  var node = document.createElement("li")
  node.setAttribute("id", checkboxId)
  addClass(node,classNames.TODO_ITEM)
  node.appendChild(mainLiDiv)
  list.appendChild(node)

  //Keeping a copy of al that's added for better accesibility
  var todoListItem = {checkboxId:checkboxId, title:todoTitle.value, unchecked:true}
  todoListArr.push(todoListItem);

  //clearing off todo title text
  todoTitle.value = ""
}

function addClass(element, eleClassName){
  element.className += eleClassName
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function recalculateItemCounts(){
  itemCountSpan.innerHTML = todoListArr.length;
  uncheckedCountSpan.innerHTML = todoListArr.filter(function(todoListItem) {
    return todoListItem.unchecked === true;
  }).length
}

function onCheckboxValueChange(evt){
  todoListArr.forEach((item, i) => {
    if(item.checkboxId === evt.currentTarget.checkboxId)
      item.unchecked =  (false === evt.currentTarget.checked)
  })
  recalculateItemCounts()
}

function onDelButtonClick(evt){
  var index = findWithAttr(todoListArr, "checkboxId", evt.currentTarget.checkboxId)
  if(index === -1)
  {
    alert("No such To Do item found.")
    return
  }
  todoListArr.forEach((item, i) => {
    if(item.checkboxId === evt.currentTarget.checkboxId)
      {
        var htmlItem = document.getElementById(item.checkboxId);
        htmlItem.parentNode.removeChild(htmlItem);
      }
  })
  todoListArr.splice(index, 1);
  recalculateItemCounts()
}
