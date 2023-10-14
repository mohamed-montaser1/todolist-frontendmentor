const itemsLeft = document.getElementById("items-left");

class Todo {
  todoTemp = document.getElementById("todo-temp").content.cloneNode(true);
  todoTempText = this.todoTemp.querySelector("span");
  todoLi = this.todoTemp.querySelector("li");

  constructor(content) {
    this.content = content;
    this.completed = false;
    this.createTodo(this.content);
  }

  createTodo(content) {
    this.todoTempText.innerHTML = content;
    const list = document.querySelector(".container__output__list");
    this.todoLi.setAttribute("id", List.getList().length || 0);
    list.appendChild(this.todoLi);
  }
}

class List {
  static addTodo(todo) {
    const list = JSON.parse(localStorage.getItem("list")) || [];
    list.push({ content: todo.content, completed: todo.completed });
    this.saveToLocalStorage(list);
  }
  static removeTodo() {}
  static saveToLocalStorage(list) {
    localStorage.setItem("list", JSON.stringify(list));
  }
  static getList() {
    return JSON.parse(localStorage.getItem("list"));
  }
}

let list = List.getList();

if (list != null) {
  itemsLeft.innerHTML = list.length;
}
displayListOnDoc(list);
function displayListOnDoc(list) {
  let docList = document.querySelector(".container__output__list");
  docList.innerHTML = "";
  for (let i = 0; i < list?.length; i++) {
    let todoTemp = document.getElementById("todo-temp").content.cloneNode(true);
    let todoTempText = todoTemp.querySelector("span");
    todoTemp.querySelector("li").setAttribute("id", i);
    todoTempText.innerHTML = list[i].content;
    docList.appendChild(todoTemp);
  }
}

const input = document.querySelector(".container__input__textbox");

input.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    if (input.value.trim().length < 1) return;
    let todo = new Todo(input.value);
    List.addTodo(todo);
    input.value = "";
    itemsLeft.innerHTML = +itemsLeft.innerHTML + 1;
  }
});

const listItemDeleteButtons = Array.from(
  document.querySelectorAll(".list__item__delete__button")
);

// listItemDeleteButtons.forEach((deleteButton) => {
//   deleteButton.addEventListener("click", (e) => {
//     console.log("clicked");
//     let parentListItem = deleteButton.parentElement;
//     let id = parentListItem.getAttribute("id");
//     list = list.filter((el, i) => i !== +id);
//     List.saveToLocalStorage(list);

//     let docList = document.querySelector(".container__output__list");
//     docList.innerHTML = "";
//     displayListOnDoc(list);
//     itemsLeft.innerHTML = +itemsLeft.innerHTML - 1;
//   });
// });

function deleteItem(parentListItem) {
  console.log("clicked");
  let id = parentListItem.getAttribute("id");
  list = list.filter((el, i) => i !== +id);
  List.saveToLocalStorage(list);
  let docList = document.querySelector(".container__output__list");
  docList.innerHTML = "";
  displayListOnDoc(list);
  itemsLeft.innerHTML = +itemsLeft.innerHTML - 1;
}
